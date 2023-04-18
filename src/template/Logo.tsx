import { AppConfig } from '@/utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
  dark?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontSize = props.xl ? 'text-xl' : 'text-xl';
  const textColor = props.dark ? 'text-gray-100' : 'text-black';
  const fontStyle = 'font-display font-bold leading-tight text-xl';

  return (
    <p className={`max-w-sm ${fontSize} ${textColor} ${fontStyle}`}>
      <span className="link link-underline link-underline-black">
        {AppConfig.site_name}
      </span>
    </p>
  );
};

export { Logo };
