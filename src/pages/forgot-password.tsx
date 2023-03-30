import { Meta } from '@/layout/Meta';
import { ResetPasswordForm } from '@/template/auth/ResetPasswordForm';
import { AppConfig } from '@/utils/AppConfig';

const ForgotPassword = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ResetPasswordForm />
  </div>
);

export default ForgotPassword;
