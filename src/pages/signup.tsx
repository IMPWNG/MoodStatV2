import { Meta } from '@/layout/Meta';
import { SignUpForm } from '@/template/auth/SignUpForm';
import { AppConfig } from '@/utils/AppConfig';

const SignUp = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <SignUpForm />
  </div>
);

export default SignUp;
