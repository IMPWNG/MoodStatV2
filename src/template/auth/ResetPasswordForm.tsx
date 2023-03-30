import Link from 'next/link';

import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { FullCenterSection } from '@/layout/FullCenterSection';

const ResetPasswordForm = () => (
  <FullCenterSection
    title="Forgot your password?"
    description="Enter your email and we'll send you a verification code."
  >
    <form className="grid gap-y-2">
      <Label htmlFor="email">Email</Label>
      <FormElement>
        <input id="email" type="text" />
      </FormElement>

      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Send email</Button>
        </button>
      </div>
    </form>

    <div className="mt-5 text-center text-xs">
      <Link href="/login" className="text-primary-500 hover:text-primary-600">
        Go back to login
      </Link>
    </div>
  </FullCenterSection>
);

export { ResetPasswordForm };
