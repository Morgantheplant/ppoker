export const importTaskStore = (state ={ isLoggedIn: false, token: null, showPane: false, projects:[{name:"test project"}] }, action) => {
    switch (action.type){
      case 'TOGGLE_PROJECT_PANE':
        return {
          showPane: !state.showPane,
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          projects: state.projects
        }
      case 'ADD_ASANA_TOKEN':
        return {
          showPane: state.showPane,
          isLoggedIn: true,
          token: action.token,
          projects: state.projects
        }
      case 'REMOVE_ASANA_TOKEN':
        return {
          showPane: state.showPane,
          isLoggedIn: false,
          token: null,
          projects: state.projects
        }
      case 'ADD_ASANA_PROJECTS':
        return {
            showPane: state.showPane,
            isLoggedIn: state.isLoggedIn,
            token: state.token,
            projects: action.projects
        }         
      default:
        return state;    
    }
}    
