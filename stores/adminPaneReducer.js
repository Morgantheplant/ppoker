export const adminPaneStore = (state ={ showPane: false }, action) => {
    switch (action.type){
      case 'TOGGLE_ADMIN_PANE':
        return {
          showPane: !state.showPane
        } 
      default:
        return state;    
    }
}    
