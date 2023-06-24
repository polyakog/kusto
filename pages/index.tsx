import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import { StyledWrap } from 'components/Container';

const Home: NextPageWithLayout = () => (
    <StyledWrap>
        <Image
            src="/kusto.png"
            alt="Next.js Logo"
            width={180}
            height={180}
            priority
        />
    </StyledWrap>
);

export default Home;

