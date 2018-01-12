import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete
} from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';
import { Paper } from 'material-ui/Paper';
import { Button } from 'material-ui/Button';

export class WidgetForm extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyDate
              name="date"
              required
              floatingLabelText="Date"
            />
            <FormsyTime
              name="time"
              required
              floatingLabelText="Time"
            />
            <FormsySelect
              name="frequency"
              required
              floatingLabelText="How often do you?"
            >
              <MenuItem value={'never'} primaryText="Never" />
              <MenuItem value={'nightly'} primaryText="Every Night" />
              <MenuItem value={'weeknights'} primaryText="Weeknights" />
            </FormsySelect>
            <FormsyAutoComplete
              name="frequency-auto-complete"
              required
              floatingLabelText="How often do you?"
              dataSource={[
                'Never',
                'Every Night',
                'Weeknights',
              ]}
            />
            <FormsyCheckbox
              name="agree"
              label="Do you agree to disagree?"
              style={switchStyle}
            />
            <FormsyToggle
              name="toggle"
              label="Toggle"
              style={switchStyle}
            />
            <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
              <FormsyRadio
                value="light"
                label="prepare for light speed"
                style={switchStyle}
              />
              <FormsyRadio
                value="not_light"
                label="light speed too slow"
                style={switchStyle}
              />
              <FormsyRadio
                value="ludicrous"
                label="go to ludicrous speed"
                style={switchStyle}
                disabled={true}
              />
            </FormsyRadioGroup>
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              required
              hintText="What is your name?"
              floatingLabelText="Name"
            />
            <FormsyText
              name="age"
              validations="isNumeric"
              validationError={numericError}
              hintText="Are you a wrinkly?"
              floatingLabelText="Age (optional)"
            />
            <FormsyText
              name="url"
              validations="isUrl"
              validationError={urlError}
              required
              hintText="http://www.example.com"
              floatingLabelText="URL"
              updateImmediately
            />
            <Button color='primary'
              raised
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
              onClick={this.handleClick}>
              Submit
            </Button>
          </Formsy.Form>
        </Paper>
      </div>
    )
  }
}

export default WidgetForm;
