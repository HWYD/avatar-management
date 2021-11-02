import Vue from 'vue'
import { Button, Form, FormItem, Input, Container, Header, Aside, Main, Menu, Submenu, MenuItem, breadcrumb, breadcrumbItem, Card, Table, TableColumn, Avatar, Dialog, Message, MessageBox, upload }
  from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(upload)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
