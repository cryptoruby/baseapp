import cx from 'classnames';
import * as React from 'react';
import { History } from 'history';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { TwoFactorAuth } from '../../components';
import { setDocumentTitle } from '../../../helpers';
import {
    RootState,
    selectAlertState,
    selectSignInRequire2FA,
    selectSignUpRequireVerification,
    selectUserFetching,
    selectUserLoggedIn,
    signIn,
    signInError,
    signInRequire2FA,
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
    signInRequire2FA: typeof signInRequire2FA;
    signUpRequireVerification: typeof signUpRequireVerification;
}

interface OwnProps {
    history: History;
    location: {
        state: {
            email: string;
            password: string;
        };
    };
}

interface SignInState {
    otpCode: string;
    error2fa: React.ReactNode;
    codeFocused: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & InjectedIntlProps & OwnProps;

class TwoFactorAuthComponent extends React.Component<Props, SignInState> {
    public state = {
        otpCode: '',
        error2fa: '',
        codeFocused: false,
    };

    public componentDidMount() {
        setDocumentTitle('Login Verification');
        this.props.signInError({ code: undefined, message: undefined });
    }

    public componentWillReceiveProps(props: Props) {
        if (props.isLoggedIn) {
            this.props.history.push('/wallets');
        }
    }

    public render() {
        const { loading, require2FA } = this.props;
        const className = cx('pg-otp-screen__container', { loading });

        return (
            <div className="pg-otp-screen">
                <div className={className}>{require2FA ? this.render2FAForm() : null}</div>
            </div>
        );
    }

    private render2FAForm = () => {
        const { loading } = this.props;
        const { otpCode, error2fa, codeFocused } = this.state;
        return (
            <TwoFactorAuth
                isLoading={loading}
                onSubmit={this.handle2FASignIn}
                title={this.props.intl.formatMessage({ id: 'page.password2fa' })}
                label={this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' })}
                buttonLabel={this.props.intl.formatMessage({ id: 'page.header.signIn' })}
                codeFocused={codeFocused}
                otpCode={otpCode}
                error={error2fa}
                handleOtpCodeChange={this.handleChangeOtpCode}
                handleChangeFocusField={this.handle2faFocus}
                redirectToSignIn={this.redirectToSignIn}
            />
        );
    };

    private redirectToSignIn = () => {
        this.props.signInRequire2FA({ require2fa: false });
        this.props.history.push('/signin');
    }

    private handleChangeOtpCode = (value: string) => {
        this.setState({
            error2fa: '',
            otpCode: value,
        });
    };

    private handle2FASignIn = () => {
        const { otpCode } = this.state;
        const { email, password } = this.props.history.location.state;

        if (!otpCode) {
            this.setState({
                error2fa: <this.errorMessage />,
            });
        } else {
            this.props.signIn({
                email,
                password,
                otp_code: otpCode,
            });
        }
    };

    private errorMessage = () => (
        <div className="warning-otp">
            <img src={require('../../assets/images/warning.svg')} alt="warning" className="warning-otp__icon" />
            {this.props.intl.formatMessage({ id: 'page.body.singin2fa.error' })}
        </div>
    )

    private handle2faFocus = () => {
        this.setState(prev => ({
            codeFocused: !prev.codeFocused,
        }));
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
    signInRequire2FA: payload => dispatch(signInRequire2FA(payload)),
    signUpRequireVerification: data => dispatch(signUpRequireVerification(data)),
});

// tslint:disable no-any
const TwoFactorAuthScreen = injectIntl(
    withRouter(connect(
        mapStateToProps,
        mapDispatchProps,
    )(TwoFactorAuthComponent) as any),
);
// tslint:enable no-any

export {
    TwoFactorAuthScreen,
};
