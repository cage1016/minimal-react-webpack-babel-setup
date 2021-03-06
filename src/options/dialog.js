import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddCustomPattern } from '../background/reducers/patterns'

class FormDialog extends React.Component {

    state = {
        pattern: '',
        error: false
    }

    add = () => {
        const newPattern = this.state.pattern.trim()
        console.log(newPattern)
        if (newPattern.length === 0) {
            this.setState({ error: true })
        } else {
            const { close, AddCustomPattern } = this.props
            AddCustomPattern({
                pattern: newPattern,
                isEnable: true,
                type: 'custom'
            })
            this.setState({ pattern: '', error: false })
            close()
        }
    }

    close = () => {
        this.setState({ pattern: '', error: false })
        this.props.close()
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.close}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Pattern</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please use `url`, `surl` & `title` (multiple) keyword to create arbitrarily pattern
                        </DialogContentText>
                        <TextField
                            error={this.state.error}
                            autoFocus
                            required
                            margin="dense"
                            id="pattern"
                            label="Copy 2 clipbard with ease pattern"
                            helperText="ex: <html>title - url</html>, ![title](url)"
                            type="text"
                            fullWidth
                            value={this.state.pattern}
                            onChange={this.handleChange('pattern')}
                            onKeyPress={(ev) => (ev.key === 'Enter') && this.add()}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.close} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.add} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FormDialog.propTypes = {

};

const mapStateToProps = (state) => ({})


const mapDispatchToProps = dispatch => bindActionCreators(
    {
        AddCustomPattern
    },
    dispatch
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormDialog)