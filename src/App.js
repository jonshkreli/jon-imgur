import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import "./styles/styles.scss"

import {galleryAction, simpleAction, subredditAction} from './actions/simpleAction'
import {ClientID} from "./constants/API_constants";
import {getGallery} from "./api/endpoints";
import Home from "./pages/Home";
import {SECTION, SORT, WINDOW} from "./constants/queryParameters";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch} from "@mui/material";
/*
 * mapDispatchToProps
*/
const mapDispatchToProps = dispatch => ({
  simpleAction: ({result_of_simple_action}) => dispatch(simpleAction({result_of_simple_action})),
    subredditAction: (subreddit) => dispatch(subredditAction(subreddit)),
    galleryAction: (gallery) => dispatch(galleryAction(gallery)),

})

/*
 * mapStateToProps
*/
export const mapStateToProps = state => ({
  ...state
})

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {


    async componentDidMount() {
        this.setGalleryInRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {section, sort, page, window, showViral} = this.state
        if (section !== prevState.section ||
            sort !== prevState.sort ||
            page !== prevState.page ||
            window !== prevState.window ||
            showViral !== prevState.showViral) {
            this.setGalleryInRedux()
        }
    }

    state = {
        section: SECTION.hot,
        sort: SORT.viral,
        page: 1,
        window: WINDOW.day,
        showViral: true,
    }


  setFetchingParameter = (reference, value) => {
      this.setState({[reference]: value})
  }

  setGalleryInRedux = async () => {
      const {section, sort, page, window, showViral} = this.state
      let gallery = await getGallery({section, sort, page, window, showViral})
      // console.log(gallery)
      this.props.galleryAction({gallery})
  }

  render() {
    return (
      <div className="App">
          <div>
              <FormControl component="fieldset">
                  <FormLabel component="legend">Section</FormLabel>
                  <RadioGroup aria-label="section" name="section" value={this.state.section} onChange={e => this.setFetchingParameter("section", e.target.value)}>
                      {Object.values(SECTION).map(s => <FormControlLabel value={s} control={<Radio />} label={s.toLocaleUpperCase()} />)}
                  </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                  <FormLabel component="legend">Sort</FormLabel>
                  <RadioGroup aria-label="sort" name="sort" value={this.state.sort} onChange={e => this.setFetchingParameter("sort", e.target.value)}>
                      {Object.values(SORT).map(s => <FormControlLabel value={s} control={<Radio />} label={s.toLocaleUpperCase()} />)}
                  </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                  <FormLabel component="legend">Window</FormLabel>
                  <RadioGroup aria-label="window" name="window" value={this.state.window} onChange={e => this.setFetchingParameter("window", e.target.value)}>
                      {Object.values(WINDOW).map(s => <FormControlLabel value={s} control={<Radio />} label={s.toLocaleUpperCase()} />)}
                  </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                  <FormControlLabel
                      control={<Switch checked={this.state.showViral} onChange={e => this.setState({showViral: e.target.checked})} name="checkedA" />}
                      label="Include viral"
                  />
              </FormControl>

          </div>
          <Home/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
