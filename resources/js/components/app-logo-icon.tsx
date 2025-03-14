import { Building2, LucideProps } from 'lucide-react';

type IconProps = Omit<LucideProps, 'ref'>

export default function AppLogoIcon(props: IconProps) {
    return <Building2 {...props} />;
}
