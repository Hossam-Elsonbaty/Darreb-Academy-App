import Courses from 'components/home/Courses';
import Hero from 'components/home/Hero';
import News from 'components/home/News';
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
      <News />
    </ScreenWrapper>
  );
}
