import React from 'react';
import { View } from '@shoutem/ui';

import { connect } from 'react-redux';
import { profileSearchDataChanged } from '../actions';
import { GenericSearch } from '../components';

class ProfileSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <View>
        <GenericSearch
        parentPageProps={this.props}
        profileScreenNavigation={this.props.navigation} //for back button on profile search
        type={true} //User search page --> type = true. Movie search page --> type = false;
        />
    </View>
     );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { profileSearchData, searchSpinner } = allReducers;
  return { profileSearchData, searchSpinner };
};

export default connect(mapStateToProps, { profileSearchDataChanged })(ProfileSearch)
