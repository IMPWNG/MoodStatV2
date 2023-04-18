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
    <div className="flex h-full w-full items-center justify-center">
      <p className={`max-w-sm ${fontSize} ${textColor} ${fontStyle}`}>
        <span className="link link-underline link-underline-black">
          &nbsp;&nbsp;{AppConfig.site_name} &nbsp;&nbsp;
        </span>
      </p>
    </div>
  );
};

export { Logo };
