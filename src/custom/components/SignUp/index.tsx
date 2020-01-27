import cr from 'classnames';
import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import { CustomInput } from '../../../components';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../helpers';

export interface SignUpFormProps {
    isLoading?: boolean;
    title?: string;
    onSignUp: () => void;
    onSignIn?: () => void;
    className?: string;
    image?: string;
    labelSignIn?: string;
    labelSignUp?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    referalCodeLabel?: string;
    termsMessage?: string;
    refId: string;
    password: string;
    email: string;
    confirmPassword: string;
    handleChangeEmail: (value: string) => void;
    handleChangePassword: (value: string) => void;
    handleChangeConfirmPassword: (value: string) => void;
    handleChangeRefId: (value: string) => void;
    hasConfirmed: boolean;
    isOver18: boolean;
    clickCheckBox18: () => void;
    clickCheckBox: () => void;
    validateForm: () => void;
    emailError: string;
    passwordError: string;
    confirmationError: string;
    handleFocusEmail: () => void;
    handleFocusPassword: () => void;
    handleFocusConfirmPassword: () => void;
    handleFocusRefId: () => void;
    confirmPasswordFocused: boolean;
    refIdFocused: boolean;
    emailFocused: boolean;
    passwordFocused: boolean;
    captchaType: 'recaptcha' | 'geetest' | 'none';
    renderCaptcha: JSX.Element | null;
    reCaptchaSuccess: boolean;
    geetestCaptchaSuccess: boolean;
    captcha_response: string;
    labelOr?: string;
    termsMessageHighlight: string;
    over18Label: string;
}

export class SignUpForm extends React.Component<SignUpFormProps> {
    public render() {
        const {
            email,
            password,
            confirmPassword,
            refId,
            onSignIn,
            isLoading,
            labelSignIn,
            labelOr,
            labelSignUp,
            emailLabel,
            passwordLabel,
            confirmPasswordLabel,
            referalCodeLabel,
            hasConfirmed,
            emailError,
            passwordError,
            confirmationError,
            emailFocused,
            passwordFocused,
            confirmPasswordFocused,
            refIdFocused,
            over18Label,
            isOver18,
        } = this.props;

        const emailGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': emailFocused,
        });

        const passwordGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': passwordFocused,
        });

        const confirmPasswordGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': confirmPasswordFocused,
        });
        const refIdGroupClass = cr('cr-sign-up-form__group', {
            'cr-sign-up-form__group--focused': refIdFocused,
        });

        return (
            <form>
                <div className="cr-sign-up-form">
                    <div className="cr-sign-up-form__form-content">
                        <div className={emailGroupClass}>
                            <CustomInput
                                type="email"
                                label={emailLabel || 'Email'}
                                placeholder={emailLabel || 'Email'}
                                defaultLabel="Email"
                                handleChangeInput={this.props.handleChangeEmail}
                                inputValue={email}
                                handleFocusInput={this.props.handleFocusEmail}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={true}
                            />
                            {emailError && <div className="cr-sign-up-form__error">{emailError}</div>}
                        </div>
                        <div className={passwordGroupClass}>
                            <CustomInput
                                type="password"
                                label={passwordLabel || 'Password'}
                                placeholder={passwordLabel || 'Password'}
                                defaultLabel="Password"
                                handleChangeInput={this.props.handleChangePassword}
                                inputValue={password}
                                handleFocusInput={this.props.handleFocusPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                            {passwordError && <div className={'cr-sign-up-form__error'}>{passwordError}</div>}
                        </div>
                        <div className={confirmPasswordGroupClass}>
                            <CustomInput
                                type="password"
                                label={confirmPasswordLabel || 'Confirm Password'}
                                placeholder={confirmPasswordLabel || 'Confirm Password'}
                                defaultLabel="Confirm Password"
                                handleChangeInput={this.props.handleChangeConfirmPassword}
                                inputValue={confirmPassword}
                                handleFocusInput={this.props.handleFocusConfirmPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                            {confirmationError && <div className={'cr-sign-up-form__error'}>{confirmationError}</div>}
                        </div>
                        <div className={refIdGroupClass}>
                            <CustomInput
                                type="text"
                                label={referalCodeLabel || 'Referral code'}
                                placeholder={referalCodeLabel || 'Referral code'}
                                defaultLabel="Referral code"
                                handleChangeInput={this.props.handleChangeRefId}
                                inputValue={refId}
                                handleFocusInput={this.props.handleFocusRefId}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                        </div>
                        <Form className="cr-sign-up-form__group">
                            <Form.Check
                                type="checkbox"
                                custom
                                id="agreeWithTerms"
                                checked={hasConfirmed}
                                onChange={this.props.clickCheckBox}
                                label={this.checkboxLabel()}
                            />
                        </Form>
                        <Form className="cr-sign-up-form__group">
                            <Form.Check
                                type="checkbox"
                                custom
                                id="over18"
                                checked={isOver18}
                                onChange={this.props.clickCheckBox18}
                                label={over18Label}
                            />
                        </Form>
                        {this.props.renderCaptcha}
                        <div className="cr-sign-up-form__button-wrapper">
                            <Button
                                block={true}
                                type="button"
                                disabled={this.disableButton()}
                                onClick={e => this.handleClick(e)}
                                size="lg"
                                variant="primary"
                            >
                                {isLoading ? 'Loading...' : (labelSignUp ? labelSignUp : 'Sign up')}
                            </Button>
                        </div>
                        <div className="cr-sign-up-form__bottom-section">
                            <span className="cr-sign-up-form__bottom-section-text">
                                {labelOr || 'or'}
                            </span>

                            <div
                                className="cr-sign-up-form__bottom-section-link"
                                onClick={onSignIn}
                            >
                                {labelSignIn ? labelSignIn : 'Login'}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    private checkboxLabel = () => (
        <span>{this.props.termsMessage} (<span className="highlight">{this.props.termsMessageHighlight}</span>)</span>
    );

    private disableButton = (): boolean => {
        const {
            email,
            password,
            confirmPassword,
            hasConfirmed,
            isOver18,
            reCaptchaSuccess,
            isLoading,
            captchaType,
            geetestCaptchaSuccess,
        } = this.props;

        if (!hasConfirmed || isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword || !isOver18) {
            return true;
        }
        if (captchaType === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }
        if (captchaType === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }
        return false;
    };

    private handleSubmitForm() {
        this.props.onSignUp();
    }

    private isValidForm() {
        const { email, password, confirmPassword } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return (email && isEmailValid) &&
            (password && isPasswordValid) &&
            (confirmPassword && isConfirmPasswordValid);
    }

    private handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }

        if (!this.isValidForm()) {
            this.props.validateForm();
        } else {
            this.handleSubmitForm();
        }
    };
}
