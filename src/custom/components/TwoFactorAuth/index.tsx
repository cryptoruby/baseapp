import cr from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CustomInput } from '../../../components';
import { IconBack } from '../../assets/images/IconBack';

export interface TwoFactorAuthProps {
    error?: React.ReactNode;
    isLoading?: boolean;
    onSubmit: () => void;
    title: string;
    label: string;
    buttonLabel: string;
    otpCode: string;
    codeFocused: boolean;
    handleOtpCodeChange: (otp: string) => void;
    handleChangeFocusField: () => void;
    redirectToSignIn: () => void;
}

class TwoFactorAuthComponent extends React.Component<TwoFactorAuthProps> {
    public render() {
        const {
            error,
            isLoading,
            title,
            label,
            buttonLabel,
            otpCode,
            codeFocused,
        } = this.props;

        const buttonWrapperClass = cr('cr-email-form__button-wrapper', {
            'cr-email-form__button-wrapper--empty': !error,
        });
        const emailGroupClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': codeFocused,
        });
        return (
            <div className="pg-2fa___form">
                <form>
                    <div className="cr-email-form">
                        <div className="cr-email-form__options-group">
                            <div className="cr-email-form__option">
                                <div className="cr-email-form__option-inner">
                                    <div className="cr-email-form__cros-icon" onClick={this.handleCancel}>
                                        <IconBack alt="back" className="back-icon" />
                                    </div>
                                    {title || 'Login verification'}
                                </div>
                            </div>
                        </div>
                        <div className="cr-email-form__form-content">
                            <div className={emailGroupClass}>
                                <CustomInput
                                    type="number"
                                    label={label || '6-digit Google Authenticator Code'}
                                    placeholder={label || '6-digit Google Authenticator Code'}
                                    defaultLabel="6-digit Google Authenticator Code"
                                    handleChangeInput={this.props.handleOtpCodeChange}
                                    inputValue={otpCode}
                                    handleFocusInput={this.props.handleChangeFocusField}
                                    classNameLabel="cr-email-form__label"
                                    classNameInput="cr-email-form__input"
                                    onKeyPress={this.handleEnterPress}
                                    autoFocus={true}
                                />
                                {error && <div className="cr-email-form__error">{error}</div>}
                            </div>
                            <div className={buttonWrapperClass}>
                                <Button
                                    disabled={isLoading || !otpCode.match(/.{6}/g)}
                                    onClick={this.handleSubmit}
                                    size="lg"
                                    variant="primary"
                                >
                                    {isLoading ? 'Loading...' : (buttonLabel ? buttonLabel : 'Sign in')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    private handleCancel = () => {
        this.props.redirectToSignIn();
    }

    private handleSubmit = () => {
        this.props.onSubmit();
    };

    private handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSubmit();
        }
    }
}

export const TwoFactorAuth = TwoFactorAuthComponent;
