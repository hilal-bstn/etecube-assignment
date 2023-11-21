import React, { useEffect } from 'react';
import { Card, Col, Empty, Row, Timeline, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ProductService from '../../services/productService';
import CompanyService from '../../services/companyService';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/userService';
import NotificationService from '../../services/notificationService';


const Report: React.FC = ()=>{

  const [products,setProducts] = React.useState([] as any[])
  const [companies,setCompanies] = React.useState([] as any[]);
  const [totalUser,setTotalUser] = React.useState([] as any[]);
  const [newUsers,setNewUsers] = React.useState([] as any[])

  const navigate=useNavigate();

  useEffect(() => {
      getProducts();
      getCompanies();
      totalUsers();
      getUsers();
  },[]);


  const getProducts = async () => {
    try{
    let productService = new ProductService();
    let productResult = await productService.newProducts();
    setProducts(productResult);     
    }   
    catch (error) {
      NotificationService.openErrorNotification({description:"Something went wrong, please try again later!",placement:"bottomRight",title:""});  
    }
  }

  const getCompanies = async () => {
    try{
    let companyService = new CompanyService();
    let companyResult = await companyService.newCompanies();
    setCompanies(companyResult);        
  }
  catch (error) {
    NotificationService.openErrorNotification({description:"Something went wrong, please try again later!",placement:"bottomRight",title:""});  
  }
  }

  const totalUsers = async () => {
    try{
    let userService = new UserService();
    let totalUserResult = await userService.totalUser();
    setTotalUser(totalUserResult.usersCount);
    }
    catch (error) {
      NotificationService.openErrorNotification({description:"Something went wrong, please try again later!",placement:"bottomRight",title:""});  
    }
  }

  const getUsers = async () => {
    try{
    let userService = new UserService();
    let userResult = await userService.newUsers();
    setNewUsers(userResult);
  }
  catch (error) {
    NotificationService.openErrorNotification({description:"Something went wrong, please try again later!",placement:"bottomRight",title:""});  
  }
  }

  return(    
      <div className="site-card-wrapper">
          <h1 className='table-title'>Reports</h1>
          <Row gutter={16} style={{marginBottom:"50px"}}>
            <Col span={12}>
              <Card bordered={false} style={{borderBottom: "1px solid darkgreen",borderRadius:0}}>
                <Statistic
                  title="Active Company"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={{borderBottom: "1px solid darksalmon",borderRadius:0}}>
                <Statistic
                  title="Product Sales"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={12}>

            <Col span={6}>
              <Card
                hoverable
                className='report-card'
                >    
                    <h1 className='table-title'>New Products</h1> 
                    {products.length > 0  ?
                       <Timeline>         
                         {products.map((item,index)=> (
                            <Timeline.Item  key = {item._id} className='timeline-report'>
                              {item.name} - {item.category} - {item.amount}
                            </Timeline.Item>
                        ))}
                        </Timeline>
                          :
                         <Empty />
                        } 

              </Card>
            </Col>

            <Col span={6}>
                  <Card
                      hoverable
                      className='report-card'
                  >
                      <h1 className='table-title'>New Companies</h1>   
                          {companies.length > 0
                              ?  <Timeline> 
                                 { companies.map((item, index) => (                      
                                    <Timeline.Item key={item._id} className='timeline-report'>
                                        {item.companyName} - {item.incorporationCountry} - {item.website}
                                    </Timeline.Item>   
                                ))}
                                </Timeline>
                              : <Empty />
                          } 
                  </Card>
              </Col>

            <Col span={6}>
              <Card
                hoverable
                className='report-card'
              ><h1 className='table-title'>New Users</h1>   
                  {newUsers.length>0 ? 
                  <Timeline> 
                      { newUsers.map((item,index)=> (<Timeline.Item  key = {item._id} className='timeline-report'>{item.username}</Timeline.Item>))}   
                  </Timeline>  
                  : <Empty />
                  } 
              </Card>
            </Col>
          </Row>     
       </div>

  );
};
  
export default Report;