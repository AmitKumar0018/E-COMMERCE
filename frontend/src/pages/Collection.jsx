import React, { useContext, useState ,useEffect} from 'react'
import {assets} from '../assets/assets'
import Title from '../components/Title'
import {ShopContext} from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products,Search,ShowSearch} = useContext(ShopContext)

  const [ShowFilter, setShowFilter] = useState(false)
  const [FilteredProduct, setFilteredProduct] = useState([])
  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const [SortType, setSortType] = useState('relavent')

  // get Category function
  const toggleCategory = (e)=>{
   if(Category.includes(e.target.value)){
    setCategory(prev => prev.filter(item => item !== e.target.value))
   }else{
    setCategory(prev => [...prev,e.target.value])
   }
  }

  //get subcategory function
  const toggleSubCategory = (e)=>{
    if(SubCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  //apply filter function
  const applyFilter = ()=>{
    let productCopy = products.slice()
    
    if(ShowSearch && Search){
     productCopy = productCopy.filter(item => item.name.toLowerCase().includes(Search.toLowerCase()))
    }

    if(Category.length > 0){
     productCopy = productCopy.filter(item => Category.includes(item.category))
    }
    if(SubCategory.length > 0){
      productCopy = productCopy.filter(item => SubCategory.includes(item.subCategory))
    }
    setFilteredProduct(productCopy)
  }

  //sort products function
  const sortProduct = ()=>{
    let fpCopy = FilteredProduct.slice()
    switch(SortType){
     case 'low-high' :
      setFilteredProduct(fpCopy.sort((a,b)=>(a.price - b.price)))
      break

     case 'high-low' :
      setFilteredProduct(fpCopy.sort((a,b)=>(b.price - a.price)))
      break
     
     default :
      applyFilter()
      break
    }
  }

  useEffect(()=>{
    applyFilter()
  },[Category,SubCategory,Search,ShowSearch,products])

  useEffect(()=>{
   sortProduct()
  },[SortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*-------------------- filter options------------------------ */}
      <div className='min-w-60'>
       <p onClick={()=>setShowFilter(!ShowFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${ShowFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
       </p>
       {/*--------------------- category filter--------------------- */}
       <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORY</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
         <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />MEN
         </p>
          <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />WOMEN
         </p>
          <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>KIDS
         </p>
        </div>
       </div>
       {/*----------------------- sub-category filter------------------------ */}
       <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
         <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>TOPWEAR
         </p>
          <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>BOTTOMWEAR
         </p>
          <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>WINTERWEAR
         </p>
        </div>
       </div>
      </div>
      {/*--------------------------- right-side ui-------------------------------- */}
      <div className='flex-1'>
       <div className='flex justify-between text-base sm:text-2xl mb-4'>
         <Title text1={'ALL'} text2={'COLLECTIONS'}/>
         {/*------------------------ product sort------------------------------- */}
         <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort By - Relavent</option>
          <option value="low-high">Sort By - Low To High</option>
          <option value="high-low">Sort By - High To Low</option>
         </select>
       </div>
       {/*--------------------------- map products here------------------------- */}
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          FilteredProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
          ))
        }
       </div>
      </div>
    </div>
  )
}

export default Collection