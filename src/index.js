// import 'es6-promise/auto'
import _ from 'lodash'
// import print from './print'
import './style.css'
// import ico from './favicon.ico'
// import { cube } from './math'

function component() {
	var element = document.createElement('div')
	var btn = document.createElement('span')

	// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
	element.innerHTML = _.join(['Hello aabb webpack', ''], '<br>')
	btn.innerHTML = 'F**king ys'
	btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
	  var print = module.default
	  print()
	});
	// btn.onclick = print
	// element.appendChild(btn);
	element.classList.add('hello')
	// element.style.background = 'url(' + ico + ') no-repeat'
	// element.style.backgroundPosition = 'center'
	// element.style.backgroundSize = 'auto 100%'
	// var img = document.createElement('img')
	// img.src = ico

  element.appendChild(btn)
	return element
	// return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
	//   const element = document.createElement('div');
	//   const lodash = _.default
	//   element.innerHTML = lodash.join(['Hello', 'webpack'], ' ');
	//   return element
	// }).catch(console.log)
}

document.body.appendChild(component())
if (module.hot) {
	console.log('inter hoting')
	module.hot.accept('./print.js', function() {
		console.log('Accepting the updated printMe module!')
		print()
	})
}

// component().then(com => {
// 	document.body.appendChild(com)
// })