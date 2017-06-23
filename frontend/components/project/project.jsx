import React from 'react';
import Header from '../util/header';
import { connect } from 'react-redux';
import { fetchProject } from '../../actions/project_actions';
import { currentProject, currentStories } from '../../selectors/project';
import StoryIndex from '../story/story_index';

class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { project_id } = this.props;
    this.props.fetchProject(project_id);
  }

  render() {
    const { project, stories } = this.props;
    return (
      <div className="project">
        <Header/>
        <StoryIndex stories={stories}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const project_id = ownProps.match.params.id;
  const project = currentProject(state, ownProps);
  const stories = project && Object.keys(state.stories)
    .map(id => state.stories[id])
    .filter(story => story.project_id === project.id);
  return { project_id, project, stories };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
