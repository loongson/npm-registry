#!/usr/bin/env bash
#
## Find the next semantic version

set -e
set -o pipefail

current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "${current_branch}" != 'production' ]] \
  && [[ "${current_branch}" != 'master' ]] \
  && [[ "${current_branch}" != 'develop' ]]; then
  echo 'Not on either production, master or develop branch. Exiting....'
  exit 1
fi

## Get last tags
last_production_tag=$(git describe --first-parent --abbrev=0 production)
last_master_tag=$(git describe --first-parent --abbrev=0 master)
last_develop_tag=$(git describe --first-parent --abbrev=0 develop)
echo Last Production Tag: ${last_production_tag}
echo Last Master Tag: ${last_master_tag}
echo Last Develop Tag: ${last_develop_tag}

## Parse semantic version from production tag
last_production_ver=( ${last_production_tag//-/ } )
last_production_mmp_ver=( ${last_production_ver[0]//./ } )
last_production_pre_ver=${last_production_ver[1]}
last_production_maj_ver=${last_production_mmp_ver[0]}
last_production_min_ver=${last_production_mmp_ver[1]}
last_production_pat_ver=${last_production_mmp_ver[2]}

## Parse semantic version from master tag
last_master_ver=( ${last_master_tag//-/ } )
last_master_mmp_ver=( ${last_master_ver[0]//./ } )
last_master_pre_ver=${last_master_ver[1]}
last_master_maj_ver=${last_master_mmp_ver[0]}
last_master_min_ver=${last_master_mmp_ver[1]}
last_master_pat_ver=${last_master_mmp_ver[2]}

## Parse semantic version from develop tag
last_develop_ver=( ${last_develop_tag//-/ } )
last_develop_mmp_ver=( ${last_develop_ver[0]//./ } )
last_develop_pre_ver=${last_develop_ver[1]}
last_develop_maj_ver=${last_develop_mmp_ver[0]}
last_develop_min_ver=${last_develop_mmp_ver[1]}
last_develop_pat_ver=${last_develop_mmp_ver[2]}

## Get counts of breaking changes, features and fixes since last production
break_count=$(git rev-list ${last_production_tag}..HEAD --grep='^...\*' --count)
feature_count=$(git rev-list ${last_production_tag}..HEAD --grep='^fea:' --count)
fix_count=$(git rev-list ${last_production_tag}..HEAD --grep='^fix:' --count)
iac_count=$(git rev-list ${last_production_tag}..HEAD --grep='^iac:' --count)
echo Breaks: ${break_count}
echo Features: ${feature_count}
echo Fixes: ${fix_count}
echo IaC Changes: ${iac_count}

unset next_maj_ver
unset next_min_ver
unset next_pat_ver
unset next_pre_ver
if [[ "${current_branch}" == 'production' ]]; then
  echo 'Promoting latest beta version to production....'
  next_maj_ver=${last_master_maj_ver}
  next_min_ver=${last_master_min_ver}
  next_pat_ver=${last_master_pat_ver}
else
  if [[ "${current_branch}" == 'master' ]]; then
    next_maj_ver=${last_develop_maj_ver}
    next_min_ver=${last_develop_min_ver}
    next_pat_ver=${last_develop_pat_ver}

    if (( "${next_maj_ver}" == "${last_master_maj_ver}" )) \
      && (( "${next_min_ver}" == "${last_master_min_ver}" )) \
      && (( "${next_pat_ver}" == "${last_master_pat_ver}" )); then
      echo 'Incrementing beta version....'
      last_master_pre_ver_parts=( ${last_master_pre_ver//./ } )
      last_master_pre_ver_num=${last_master_pre_ver_parts[1]}
      next_pre_ver="beta.$((last_master_pre_ver_num + 1))"
    else
      echo 'Promoting latest alpha version to beta.1....'
      next_pre_ver='beta.1'
    fi
  else
    if [[ "${current_branch}" == 'develop' ]]; then
      ## Find next mmp version
      if [[ "${break_count}" -gt 0 ]]; then
        ## Increment major version if breaking changes added
        next_maj_ver=$((last_production_maj_ver + 1))
        next_min_ver='0'
        next_pat_ver='0'
      else
        next_maj_ver=${last_production_maj_ver}
        if [[ "${feature_count}" -gt 0 ]]; then
          ## Increment minor version if feature added
          next_min_ver=$((last_production_min_ver + 1))
          next_pat_ver='0'
        else
          next_min_ver=${last_production_min_ver}
          if [[ "${fix_count}" -gt 0 ]] || [[ "${iac_count}" -gt 0 ]]; then
            ## Increment patch version if fix added or iac changed
            next_pat_ver=$((last_production_pat_ver + 1))
          else
            next_pat_ver=${last_production_pat_ver}
          fi
        fi
      fi
    fi

    if (( "${next_maj_ver}" == "${last_production_maj_ver}" )) \
      && (( "${next_min_ver}" == "${last_production_min_ver}" )) \
      && (( "${next_pat_ver}" == "${last_production_pat_ver}" )); then
      echo 'No breaking change, feature, fix or IaC change was found.'
      echo 'Version bump is unnecessary.'
      exit 1
    fi

    if (( "${next_maj_ver}" == "${last_develop_maj_ver}" )) \
      && (( "${next_min_ver}" == "${last_develop_min_ver}" )) \
      && (( "${next_pat_ver}" == "${last_develop_pat_ver}" )); then
      echo 'Incrementing alpha version....'
      last_develop_pre_ver_parts=( ${last_develop_pre_ver//./ } )
      last_develop_pre_ver_num=${last_develop_pre_ver_parts[1]}
      next_pre_ver="alpha.$((last_develop_pre_ver_num + 1))"
    else
      echo 'Creating new alpha.1 version....'
      next_pre_ver='alpha.1'
    fi
  fi
fi

if [[ -z "${next_pre_ver}" ]]; then
  export NEXT_VERSION="${next_maj_ver}.${next_min_ver}.${next_pat_ver}"
else
  export NEXT_VERSION="${next_maj_ver}.${next_min_ver}.${next_pat_ver}-${next_pre_ver}"
fi
echo Next Version: ${NEXT_VERSION}
