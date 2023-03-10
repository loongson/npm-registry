/* -*- Mode: C; tab-width: 4; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*
 *     Copyright 2011-2012 Couchbase, Inc.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/*
 * This file is generated by running configure. Any changes you make to this
 * file will be overwritten the next time you run configure. If you want to
 * make permanent changes to the file you should edit configure.ac instead.
 * All platform-specific includes should be placed inside config_static.h
 * to keep the config.h as small as possible. That allows us for easily
 * use another build systems with a poor support for automake (like Windows)
 *
 * @author Trond Norbye
 */

#ifndef CONFIG_H
#define CONFIG_H

#ifndef _CRT_SECURE_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#endif

#include <string.h>

#define HAVE_PKCS5_PBKDF2_HMAC 1
#define HAVE_WINSOCK2_H 1
#define HAVE_WS2TCPIP_H 1
#define HAVE_QUERYPERFORMANCECOUNTER 1
#define HAVE__FTIME64_S 1
#define HAVE_STDARG_H 1

#include "config_static.h"
#endif
