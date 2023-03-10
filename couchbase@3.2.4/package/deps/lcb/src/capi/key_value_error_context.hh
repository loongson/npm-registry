/* -*- Mode: C; tab-width: 4; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*
 *     Copyright 2016-2021 Couchbase, Inc.
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

#ifndef LIBCOUCHBASE_CAPI_KEY_VALUE_ERROR_CONTEXT_HH
#define LIBCOUCHBASE_CAPI_KEY_VALUE_ERROR_CONTEXT_HH

#include <cstddef>
#include <cstdint>
#include <string>

/**
 * @private
 */
struct lcb_KEY_VALUE_ERROR_CONTEXT_ {
    lcb_STATUS rc;
    std::uint16_t status_code;
    std::uint32_t opaque;
    std::uint64_t cas;
    std::string key{};
    std::string bucket{};
    std::string collection{};
    std::string scope{};
    std::string ref{};
    std::string context{};
    std::string endpoint{};
};

#endif // LIBCOUCHBASE_CAPI_KEY_VALUE_ERROR_CONTEXT_HH
