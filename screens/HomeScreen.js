import Courses from 'components/home/Courses';
import Hero from 'components/home/Hero';
import Works from 'components/home/Works';
import ScreenWrapper from 'components/WrapperScreen';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <Hero />
      <Courses />
      <Works />
    </ScreenWrapper>
  );
}
