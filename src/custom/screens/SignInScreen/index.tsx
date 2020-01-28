import cx from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { SignInComponent } from '../../components';
import { EMAIL_REGEX, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, setDocumentTitle } from '../../../helpers';
import {
    RootState,
    selectAlertState,
    selectSignInRequire2FA,
    selectSignUpRequireVerification,
    selectUserFetching,
    selectUserLoggedIn,
    signIn,
    signInError,
    signUpRequireVerification,
} from '../../../modules';

interface ReduxProps {
    isLoggedIn: boolean;
    loading?: boolean;
    require2FA?: boolean;
    requireEmailVerification?: boolean;
}

interface DispatchProps {
    signIn: typeof signIn;
    signInError: typeof signInError;
    signUpRequireVerification: typeof signUpRequireVerification;
}

interface SignInState {
    email: string;
    emailError: string;
    emailFocused: boolean;
    password: string;
    passwordError: string;
    passwordFocused: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & InjectedIntlProps;

class SignIn extends React.Component<Props, SignInState> {
    public state = {
        email: '',
        emailError: '',
        emailFocused: false,
        password: '',
        passwordError: '',
        passwordFocused: false,
    };

    public componentDidMount() {
        setDocumentTitle('Sign In');
        this.props.signInError({ code: undefined, message: undefined });
        this.props.signUpRequireVerification({requireVerification: false});
    }

    public componentWillReceiveProps(props: Props) {
        if (props.isLoggedIn) {
            this.props.history.push('/wallets');
        }
        if (props.requireEmailVerification) {
            props.history.push('/email-verification', { email: this.state.email });
        }
        if (props.require2FA) {
            props.history.push('/otp-code', { email: this.state.email, password: this.state.password });
        }
    }

    public render() {
        const { loading, require2FA } = this.props;
        const className = cx('pg-sign-in-screen__container', { loading });

        return (
            <div className="pg-sign-in-screen">
                <div className={className}>{!require2FA ? this.renderSignInForm() : null}</div>
            </div>
        );
    }

    private renderSignInForm = () => {
        const { loading } = this.props;
        const { email, emailError, emailFocused, password, passwordError, passwordFocused } = this.state;

        return (
            <SignInComponent
                email={email}
                emailError={emailError}
                emailFocused={emailFocused}
                emailPlaceholder={this.props.intl.formatMessage({ id: 'page.header.signIn.email' })}
                password={password}
                passwordError={passwordError}
                passwordFocused={passwordFocused}
                passwordPlaceholder={this.props.intl.formatMessage({ id: 'page.header.signIn.password' })}
                labelSignIn={this.props.intl.formatMessage({ id: 'page.header.signIn' })}
                labelSignUp={this.props.intl.formatMessage({ id: 'page.header.signUp' })}
                emailLabel={this.props.intl.formatMessage({ id: 'page.header.signIn.email' })}
                passwordLabel={this.props.intl.formatMessage({ id: 'page.header.signIn.password' })}
                receiveConfirmationLabel={this.props.intl.formatMessage({ id: 'page.header.signIn.receiveConfirmation' })}
                forgotPasswordLabel={this.props.intl.formatMessage({ id: 'page.header.signIn.forgotPassword' })}
                isLoading={loading}
                onForgotPassword={this.forgotPassword}
                onSignUp={this.handleSignUp}
                onSignIn={this.handleSignIn}
                handleChangeFocusField={this.handleFieldFocus}
                isFormValid={this.validateForm}
                refreshError={this.refreshError}
                changeEmail={this.handleChangeEmailValue}
                changePassword={this.handleChangePasswordValue}
            />
        );
    };

    private refreshError = () => {
        this.setState({
            emailError: '',
            passwordError: '',
        });
    };

    private handleSignIn = () => {
        const { email, password } = this.state;
        this.props.signIn({
            email,
            password,
        });
    };

    private handleSignUp = () => {
        this.props.history.push('/signup');
    };

    private forgotPassword = () => {
        this.props.history.push('/forgot_password');
    };

    private handleFieldFocus = (field: string) => {
        switch (field) {
            case 'email':
                this.setState(prev => ({
                    emailFocused: !prev.emailFocused,
                }));
                break;
            case 'password':
                this.setState(prev => ({
                    passwordFocused: !prev.passwordFocused,
                }));
                break;
            default:
                break;
        }
    };

    private validateForm = () => {
        const { email, password } = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);

        if (!isEmailValid) {
            this.setState({
                emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                passwordError: '',
            });
            return;
        }
        if (!password) {
            this.setState({
                emailError: '',
                passwordError: this.props.intl.formatMessage({ id: ERROR_EMPTY_PASSWORD }),
            });
            return;
        }
    };

    private handleChangeEmailValue = (value: string) => {
        this.setState({
            email: value,
        });
    };

    private handleChangePasswordValue = (value: string) => {
        this.setState({
            password: value,
        });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    alert: selectAlertState(state),
    isLoggedIn: selectUserLoggedIn(state),
    loading: selectUserFetching(state),
    require2FA: selectSignInRequire2FA(state),
    requireEmailVerification: selectSignUpRequireVerification(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    signIn: data => dispatch(signIn(data)),
    signInError: error => dispatch(signInError(error)),
    signUpRequireVerification: data => dispatch(signUpRequireVerification(data)),
});

// tslint:disable no-any
const SignInScreen = injectIntl(
    withRouter(connect(
        mapStateToProps,
        mapDispatchProps,
    )(SignIn) as any),
);
// tslint:enable no-any

export {
    SignInScreen,
};
