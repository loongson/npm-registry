/* -*- Mode: C; tab-width: 4; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*
 *     Copyright 2016-2020 Couchbase, Inc.
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

#ifndef LCB_MCTX_HELPER_H
#define LCB_MCTX_HELPER_H
#include <libcouchbase/couchbase.h>

namespace lcb
{

class MultiCmdContext : public lcb_MULTICMD_CTX
{
  protected:
    virtual lcb_STATUS MCTX_add_observe(const lcb_CMDOBSERVE *cmd) = 0;
    virtual lcb_STATUS MCTX_add_endure(const lcb_CMDENDURE *cmd) = 0;
    virtual lcb_STATUS MCTX_done(void *cookie) = 0;
    virtual void MCTX_fail() = 0;
    virtual void MCTX_setspan(lcbtrace_SPAN *span) = 0;

    MultiCmdContext()
    {
        lcb_MULTICMD_CTX::add_observe = dispatch_mctx_add_observe;
        lcb_MULTICMD_CTX::add_endure = dispatch_mctx_add_endure;
        lcb_MULTICMD_CTX::done = dispatch_mctx_done;
        lcb_MULTICMD_CTX::fail = dispatch_mctx_fail;
        lcb_MULTICMD_CTX::setspan = dispatch_mctx_setspan;
    }

    virtual ~MultiCmdContext() {}

  private:
    static lcb_STATUS dispatch_mctx_add_observe(lcb_MULTICMD_CTX *ctx, const lcb_CMDOBSERVE *cmd)
    {
        return static_cast<MultiCmdContext *>(ctx)->MCTX_add_observe(cmd);
    }
    static lcb_STATUS dispatch_mctx_add_endure(lcb_MULTICMD_CTX *ctx, const lcb_CMDENDURE *cmd)
    {
        return static_cast<MultiCmdContext *>(ctx)->MCTX_add_endure(cmd);
    }
    static lcb_STATUS dispatch_mctx_done(lcb_MULTICMD_CTX *ctx, void *cookie)
    {
        return static_cast<MultiCmdContext *>(ctx)->MCTX_done(cookie);
    }
    static void dispatch_mctx_fail(lcb_MULTICMD_CTX *ctx)
    {
        static_cast<MultiCmdContext *>(ctx)->MCTX_fail();
    }
    static void dispatch_mctx_setspan(lcb_MULTICMD_CTX *ctx, lcbtrace_SPAN *span)
    {
        static_cast<MultiCmdContext *>(ctx)->MCTX_setspan(span);
    }
};

} // namespace lcb

#endif
