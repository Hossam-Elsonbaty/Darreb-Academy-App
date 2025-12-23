import Courses from 'components/home/Courses';
import Hero from 'components/home/Hero';
import Testimonials from 'components/home/Testimonials';
import Works from 'components/home/Works';
import ScreenWrapper from 'components/WrapperScreen';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <Hero />
      <Courses />
      <Works />
      <Testimonials />
    </ScreenWrapper>
  );
}
