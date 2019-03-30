import san from 'san';
import {router} from 'san-router';
import San from './components/app.san';

console.log('hello webpack  San');

router.add({rule: '/', Component: San, target: '#app'});

router.start()
