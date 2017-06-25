## Database Schema ##

All tables have timestamps and **id** primary keys.These are omitted below for brevity.

### users ###

column name     | data type | details
----------------|-----------|-----------------------
name | string | not null
initials | string | not null
email | string | not null, index, unique
password_digest | string | not null
session_token | string | not null, indexed, unique

### projects  ###

column name     | data type | details
----------------|-----------|-----------------------
title | string | not null

### memberships ###

column name     | data type | details
----------------|-----------|-----------------------
user_id | integer | foreign key (users), indexed
project_id | integer | foreign key (projects), indexed, unique [user_id]
role | string | (*owner*, *member*, or *viewer*)

### stories ###

column name     | data type | details
----------------|-----------|-----------------------
project_id | integer | foreign key (projects), indexed
title | string | not null
description | text |
kind | string | (*feature*, *bug*, *chore*, or *release*)
state | string | not null, (*unstarted*, *started*, *finished*, *delivered*, *accepted*, or *rejected*)
points | integer | *0*, *1*, *2,* *4*, or *8*
priority | integer | indexed
author_id | integer | foreign key (users), indexed
owner_id | integer | foreign key (users), indexed

### tasks ###

column name     | data type | details
----------------|-----------|-----------------------
title | string | not null
done | boolean | not null
story_id | integer | not null, foreign key (stories), indexed
author_id | integer | not null, foreign key (users)

### comments ###

column name     | data type | details
----------------|-----------|-----------------------
body | text | not null
story_id | integer | not null, foreign key (stories), indexed
author_id | integer | not null, foreign key (users)
