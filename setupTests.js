import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// import raf from 'tempPolyfills';
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({ adapter: new Adapter() });
//
// // global.shallow = shallow;
// // global.render = render;
// // global.mount = mount;
//
// console.error = message => {
//     throw new Error(message)
// };