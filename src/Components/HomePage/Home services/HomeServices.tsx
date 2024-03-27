import styles from './HomeServices.module.css'


const HomeServices = () => {
  return (
    <div className= {styles.service_containerA} >
        <div className= {styles.detailesA} ></div>
        <img className= {styles.imgA} src="/ImgA.webp" alt="" />
    </div>
  )
}

export default HomeServices