# ===
# This configuration defines options specific to compiling SQLite3 itself.
# Compile-time options are loaded by the auto-generated file "defines.gypi".
# The --sqlite3 option can be provided to use a custom amalgamation instead.
# ===

{
  'includes': ['common.gypi'],
  'targets': [
    {
      'target_name': 'locate_sqlite3',
      'type': 'none',
      'hard_dependency': 1,
      'conditions': [
        ['sqlite3 == ""', {
          'actions': [{
            'action_name': 'copy_builtin_sqlite3',
            'inputs': [
              'sqlite3/sqlite3.c',
              'sqlite3/sqlite3.h',
              'sqlite3/sqlite3ext.h',
            ],
            'outputs': [
              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.c',
              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.h',
              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3ext.h',
            ],
            'action': ['node', 'copy.js', '<(SHARED_INTERMEDIATE_DIR)/sqlite3', '', 'sqlite3.c', 'sqlite3.h', 'sqlite3ext.h'],
          }],
        }, {
          'actions': [{
            'action_name': 'copy_custom_sqlite3',
            'inputs': [
              '<(sqlite3)/sqlite3.c',
              '<(sqlite3)/sqlite3.h',
            ],
            'outputs': [
              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.c',
              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.h',
            ],
            'action': ['node', 'copy.js', '<(SHARED_INTERMEDIATE_DIR)/sqlite3', '<(sqlite3)', 'sqlite3.c', 'sqlite3.h'],
          }],
        }],
      ],
    },
    {
      'target_name': 'sqlite3',
      'type': 'static_library',
      'dependencies': ['locate_sqlite3'],
      'sources': ['<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.c'],
      'include_dirs': ['<(SHARED_INTERMEDIATE_DIR)/sqlite3/'],
      'direct_dependent_settings': {
        'include_dirs': ['<(SHARED_INTERMEDIATE_DIR)/sqlite3/'],
      },
      'cflags': ['-std=c99', '-w', '-maes', '-msse4.2'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-std=c99', '-maes', '-msse4.2'],
        'WARNING_CFLAGS': ['-w'],
      },
      'conditions': [
        ['sqlite3 == ""', {
          'includes': ['defines.gypi'],
        }, {
          'defines': [
            # This is currently required by better-sqlite3.
            'SQLITE_ENABLE_COLUMN_METADATA',
          ],
        }],
        ['OS=="win"', {
          'cflags!': ['-maes', '-msse4.2'],
        }],
        ['target_arch=="arm64"', {
          'cflags!': ['-maes', '-msse4.2'],
          'cflags': ['-march=native'],
        }],
        ['target_arch=="arm"', {
          'cflags!': ['-maes', '-msse4.2'],
          'cflags': ['-march=native'],
        }],
        ['target_arch=="loong64"', {
          'cflags!': ['-maes', '-msse4.2'],
          'cflags': ['-march=native'],
        }],
        ['target_arch=="mips64el"', {
          'cflags!': ['-maes', '-msse4.2'],
          'cflags': ['-march=native'],
        }],
      ],
      'configurations': {
        'Debug': {
          'msvs_settings': { 'VCCLCompilerTool': { 'RuntimeLibrary': 1 } }, # static debug
        },
        'Release': {
          'msvs_settings': { 'VCCLCompilerTool': { 'RuntimeLibrary': 0 } }, # static release
        },
      },
    },
  ],
}
