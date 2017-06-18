## Component Hierarchy ##

### AuthFormContainer
- AuthForm

### HomeContainer
- Header
- OutsideContent

### Dashboard
- Header
- DashboardContent

### DashboardContent
- Sidebar
- StoryPanelContainer

### Sidebar
- SidebarHeader
- SidebarItemsIndex

### SidebarItemsIndex
- SidebarItem

### StoryPanelContainer
- StoryPanel

### StoryPanel
- StoryIndexHeader
- StoryIndex

### StoryIndex
- StoryItem

## Routes

Path   | Component   
-------|----------
/signup | AuthFormContainer
/signin | AuthFormContainer
/home | HomeContainer
/projects | DashboardContainer
