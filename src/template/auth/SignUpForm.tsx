import Link from 'next/link';

import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { FullCenterSection } from '@/layout/FullCenterSection';

const SignUpForm = () => (
  <FullCenterSection
    title="Create your account"
    description="Sign up with your email address and password."
  >
    <form className="grid gap-y-2">
      <Label htmlFor="email">Email</Label>
      <FormElement>
        <input id="email" type="text" />
      </FormElement>

      <Label htmlFor="password">Password</Label>
      <FormElement helper="Your password must be at least 8 characters.">
        <input id="password" type="password" />
      </FormElement>

      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Sign up</Button>
        </button>
      </div>
    </form>

    <div className="mt-5 text-center text-xs">
      Already have an account?{' '}
      <Link href="/login" className="text-primary-500 hover:text-primary-600">
        Log in now
      </Link>
      .
    </div>
  </FullCenterSection>
);

export { SignUpForm };
