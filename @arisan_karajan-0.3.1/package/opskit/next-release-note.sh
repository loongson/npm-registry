#!/usr/bin/env bash
#
## Parse git history and generate release note since last production release

set -e
set -o pipefail

## Get next version
if [[ $(git branch | grep \*) == "master" ]] || [[ ! -z "${CI_BUILD_TAG}" ]]; then
  version=$(git tag --sort='version:refname' | tail -n 1); echo ${version}
else
  version=$(git rev-parse HEAD); echo ${version}
fi

## Get last production tag
last_prod_commit=$(git log --format=%H -n1 origin/production)
last_prod_tag=$(git tag --merged ${last_prod_commit} --sort='-v:refname' | head -n1)
echo Last Production Tag: ${last_prod_tag}

## Add release note title
note="Version ${version:0:17} ($(date -u +%Y-%m-%dT%H:%M:%SZ))"
note="${note}\\\n$(printf '%0.s=' $(seq 1 ${#note}))\\\n"

## Add new features paragraph
commits=$(git rev-list ${last_prod_tag}..HEAD --grep='^fea')
if [[ ! -z ${commits} ]]; then
  echo 'New Features:'
  echo "${commits}"
  contains_valid_subject=0
  for commit in ${commits}; do
    subject=$(git log --format=%s -n1 ${commit})
    if [[ "${subject}" =~ ^fea.*$ ]]; then
      contains_valid_subject=1
      echo "${subject}"
    fi
  done
  if [[ "${contains_valid_subject}" -eq 1 ]]; then
    note="${note}\\\nNew Features\\\n------------\\\n"
    last_subject='';
    for commit in ${commits}; do
      subject=$(git log --format=%s -n1 ${commit})
      if [[ "${subject}" =~ ^fea.*$ ]]; then
        if [[ "${subject}" != "${last_subject}" ]]; then
          note="${note}- ${subject:5}\\\n"
          last_subject="${subject}"
        fi
      fi
    done
  fi
fi

## Add performance improvement paragraph
commits=$(git rev-list ${last_prod_tag}..HEAD --grep='^per')
if [[ ! -z ${commits} ]]; then
  echo 'Performance Improvements:'
  echo "${commits}"
  contains_valid_subject=0
  for commit in ${commits}; do
    subject=$(git log --format=%s -n1 ${commit})
    if [[ "${subject}" =~ ^per.*$ ]]; then
      contains_valid_subject=1
      echo "${subject}"
    fi
  done
  if [[ "${contains_valid_subject}" -eq 1 ]]; then
    note="${note}\\\nPerformance Improvements\\\n------------------------\\\n"
    last_subject='';
    for commit in ${commits}; do
      subject=$(git log --format=%s -n1 ${commit})
      if [[ "${subject}" =~ ^per.*$ ]]; then
        if [[ "${subject}" != "${last_subject}" ]]; then
          note="${note}- ${subject:5}\\\n"
          last_subject="${subject}"
        fi
      fi
    done
  fi
fi

## Add bug fixes paragraph
commits=$(git rev-list ${last_prod_tag}..HEAD --grep='^fix')
if [[ ! -z ${commits} ]]; then
  echo 'Fixes:'
  echo "${commits}"
  contains_valid_subject=0
  for commit in ${commits}; do
    subject=$(git log --format=%s -n1 ${commit})
    if [[ "${subject}" =~ ^fix.*$ ]]; then
      contains_valid_subject=1
      echo "${subject}"
    fi
  done
  if [[ "${contains_valid_subject}" -eq 1 ]]; then
    note="${note}\\\nBug Fixes\\\n---------\\\n"
    last_subject='';
    for commit in ${commits}; do
      subject=$(git log --format=%s -n1 ${commit})
      if [[ "${subject}" =~ ^fix.*$ ]]; then
        if [[ "${subject}" != "${last_subject}" ]]; then
          note="${note}- ${subject:5}\\\n"
          last_subject="${subject}"
        fi
      fi
    done
  fi
fi

## Add breaking changes paragraph
commits=$(git rev-list ${last_prod_tag}..HEAD --grep='^...\*')
echo 'BREAKING CHANGES:'
echo "$commits"
if [[ ! -z ${commits} ]]; then
  note="${note}\\\n### This release has major changes.\\\n"
fi

echo "${note}"
export RELEASE_NOTE="${note}"