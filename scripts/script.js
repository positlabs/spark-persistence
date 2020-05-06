/*

  Boilerplate and demo for the persistence module

  https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/persistencemodule

  Make sure to whitelist your keys (space separated) in project > properties > capabilities > whitelisted keys

*/

const D = require('Diagnostics')
const R = require('Reactive')
const {slider, picker} = require('NativeUI')
const Textures = require('Textures')
const Persistence = require('Persistence')
const Time = require('Time')

/*
  PICKER
*/ 
Textures.findFirst('icon').then(image_texture => {
  picker.configure({
    selectedIndex: 0,
    items: [
      {image_texture},
      {image_texture},
      {image_texture},
      {image_texture},
      {image_texture},
    ]
  })
  picker.visible = R.val(true)

  // get the saved picker selectedIndex
  Persistence.userScope.get('picker').then((data) => {
    D.log('Persistence.userScope.get("picker"): ' + data.selectedIndex)
    picker.selectedIndex = R.val(data.selectedIndex)
  }).catch(error => {
    D.log('failed to get saved picker value')
    D.log(error)
  })
})
  
// save the picker selectedIndex
picker.selectedIndex.monitor().subscribe(({newValue}) => {
  D.log('picker: ' + newValue)
  // you can format your data object however you want
  const data = {selectedIndex: newValue}
  Persistence.userScope.set('picker', data).catch(error => {
    D.log('failed to save picker value')
    D.log(error)
  })
})


/*
  SLIDER
*/

slider.visible = R.val(true)

// watch for slider changes and store the value
slider.value.monitor().subscribe(({newValue}) => {
  D.log('slider: ' + newValue)
  const data = {value: newValue}
  Persistence.userScope.set('slider', data).catch(error => {
    D.log('failed to save slider value')
    D.log(error)
  })
})

// get the saved slider value
Persistence.userScope.get('slider').then(data => {
  slider.value = R.val(data.value)
}).catch(error => {
  D.log('failed to get saved slider value')
  D.log(error)
  // default
  slider.value = R.val(.5)
})
