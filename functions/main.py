from typing import Optional
from fastapi import FastAPI
from pprint import pprint
from fastapi.params import Header
from user_agents import parse
from starlette.responses import RedirectResponse
import user_agents

app = FastAPI()


@app.get("/proxy")
async def proxy(url: Optional[str] = None, user_agent: Optional[str] = Header(None)):
    ua = parse(str(user_agents))
    pprint(url)
    if ua.is_pc:
        return {"status": 412, "message": "Can only claim through mobile device"}
    # return RedirectResponse(url="exp://127.0.0.1:19000/--/claim-profile")
    return RedirectResponse(url)
