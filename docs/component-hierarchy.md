## Component Hierarchy ##

### AuthFormContainer
- AuthForm

### Home
- Header
- OutsideContent

### Dashboard
- Header
- Dashboard
  - Sidebar
    - SidebarHeader
    - SidebarItemContainer
      - SidebarItem
  - StoryPanelContainer
    - StoryPanel
      - StoryPanelHeader
      - StoryItemIndex
        - StoryItem

## Routes

Path   | Component   
-------|----------
/signup | AuthFormContainer
/signin | AuthFormContainer
/home | Home
/projects | Dashboard
