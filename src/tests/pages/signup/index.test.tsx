import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {useRouter} from 'next/router';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SignupForm from '../../../../pages/signup/index';
import {myFetch} from '../../../main/rest/MyFetch';
import {signUpValidator} from '../../../main/utils/SignUpValidator';

// Mock dependencies
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../../main/rest/MyFetch', () => ({
    myFetch: jest.fn(),
}));

jest.mock('../../../main/utils/SignUpValidator', () => ({
    signUpValidator: jest.fn(),
}));

const mockPush = jest.fn();
const mockMyFetch = myFetch as jest.MockedFunction<typeof myFetch>;
const mockSignUpValidator = signUpValidator as jest.MockedFunction<typeof signUpValidator>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const theme = createTheme();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (component: React.ReactElement) => {
    return render(component, {wrapper: TestWrapper});
};

describe('SignupForm', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: mockPush,
            route: '',
            pathname: '',
            query: {},
            asPath: '',
            back: jest.fn(),
            beforePopState: jest.fn(),
            prefetch: jest.fn(),
            reload: jest.fn(),
            replace: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
            isFallback: false,
            isLocaleDomain: false,
            isReady: true,
            isPreview: false,
        } as any);

        jest.clearAllMocks();
    });

    it('renders the signup form with all elements', () => {
        renderWithTheme(<SignupForm/>);

        expect(screen.getByTestId('signup-container')).toBeInTheDocument();
        expect(screen.getByTestId('signup-form')).toBeInTheDocument();
        expect(screen.getByTestId('signup-title')).toBeInTheDocument();
        expect(screen.getByTestId('signup-username-input')).toBeInTheDocument();
        expect(screen.getByTestId('signup-email-input')).toBeInTheDocument();
        expect(screen.getByTestId('signup-password-input')).toBeInTheDocument();
        expect(screen.getByTestId('signup-submit-button')).toBeInTheDocument();
        expect(screen.getByTestId('signup-login-link')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error when signup validation fails', async () => {
        mockSignUpValidator.mockReturnValue(false);

        renderWithTheme(<SignupForm/>);

        const signupButton = screen.getByTestId('signup-submit-button');
        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(screen.getByTestId('signup-error')).toBeInTheDocument();
            expect(screen.getByText('Some fields are empty or invalid')).toBeInTheDocument();
        });

        expect(mockMyFetch).not.toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it('successfully submits form with valid data', async () => {
        mockSignUpValidator.mockReturnValue(true);
        mockMyFetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        } as any);

        renderWithTheme(<SignupForm/>);

        const usernameInput = screen.getByTestId('signup-username-input').querySelector('input') as HTMLInputElement;
        const emailInput = screen.getByTestId('signup-email-input').querySelector('input') as HTMLInputElement;
        const passwordInput = screen.getByTestId('signup-password-input').querySelector('input') as HTMLInputElement;
        const signupButton = screen.getByTestId('signup-submit-button');

        fireEvent.change(usernameInput, {target: {value: 'testuser'}});
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'testpass123'}});

        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testpass123');

        fireEvent.click(signupButton);

        expect(signupButton).toBeDisabled();
        expect(screen.getByTestId('signup-loading-spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockSignUpValidator).toHaveBeenCalledWith('testuser', 'test@example.com', 'testpass123');
            expect(mockMyFetch).toHaveBeenCalledWith('/api/signup', 'POST', {
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpass123'
            });
            expect(mockPush).toHaveBeenCalledWith('/signup/success');
        });
    });

    it('shows error when API request fails', async () => {
        mockSignUpValidator.mockReturnValue(true);
        mockMyFetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({}),
        } as any);

        renderWithTheme(<SignupForm/>);

        const usernameInput = screen.getByTestId('signup-username-input').querySelector('input') as HTMLInputElement;
        const emailInput = screen.getByTestId('signup-email-input').querySelector('input') as HTMLInputElement;
        const passwordInput = screen.getByTestId('signup-password-input').querySelector('input') as HTMLInputElement;
        const signupButton = screen.getByTestId('signup-submit-button');

        fireEvent.change(usernameInput, {target: {value: 'testuser'}});
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'testpass123'}});

        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(screen.getByText('Signup failed')).toBeInTheDocument();
        });

        expect(usernameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });

    it('shows error when fetch throws an exception', async () => {
        mockSignUpValidator.mockReturnValue(true);
        mockMyFetch.mockRejectedValue(new Error('Network error'));

        renderWithTheme(<SignupForm/>);

        const usernameInput = screen.getByTestId('signup-username-input').querySelector('input') as HTMLInputElement;
        const emailInput = screen.getByTestId('signup-email-input').querySelector('input') as HTMLInputElement;
        const passwordInput = screen.getByTestId('signup-password-input').querySelector('input') as HTMLInputElement;
        const signupButton = screen.getByTestId('signup-submit-button');

        fireEvent.change(usernameInput, {target: {value: 'testuser'}});
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'testpass123'}});

        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeInTheDocument();
        });

        // Check that form fields are reset after error
        expect(usernameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });

    it('clears previous error when starting new signup attempt', async () => {
        // First, create an error
        mockSignUpValidator.mockReturnValue(false);
        renderWithTheme(<SignupForm/>);

        const signupButton = screen.getByTestId('signup-submit-button');
        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(screen.getByText('Some fields are empty or invalid')).toBeInTheDocument();
        });

        // Now try again with valid data
        mockSignUpValidator.mockReturnValue(true);
        mockMyFetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        } as any);

        fireEvent.change(screen.getByTestId('signup-username-input').querySelector('input')!, {target: {value: 'testuser'}});
        fireEvent.change(screen.getByTestId('signup-email-input').querySelector('input')!, {target: {value: 'test@example.com'}});
        fireEvent.change(screen.getByTestId('signup-password-input').querySelector('input')!, {target: {value: 'testpass123'}});

        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(screen.queryByText('Some fields are empty or invalid')).not.toBeInTheDocument();
        });
    });
});
