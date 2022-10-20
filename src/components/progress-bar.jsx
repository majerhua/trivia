import React from 'react'
  
const Progress_bar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        width: '100%',
        backgroundColor: '#420211',
        borderRadius: 40,
        marginTop: '10px'
      }
      
      const Childdiv = {
        height: '12px',
        width: `${progress}%`,
        backgroundColor: '#CF5C77',
        borderRadius:40,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}></span>
      </div>
    </div>
    )
}
  
export default Progress_bar;