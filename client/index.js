import { auth } from './classes/sync'
import Example from './example'
import Try1 from './try1'
import Try2 from './try2'

if (window.location.hash === '#start') {

  // threejs try
  // const try1 = new Try1()

  // interpolation and more stats try
  const try2 = new Try2()


} else {
  auth()
}