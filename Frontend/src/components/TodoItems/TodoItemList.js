import '../../App.css'
import { Button, Table } from 'react-bootstrap'
import React, {useState} from 'react'
import { updateItem } from '../../services/ItemService';
import ErrorDialog from '../ErrorDialog'

const TodoItemList = ({items, getItems}) => {

  const [show, setShow] = useState(false);

  async function handleMarkAsComplete(item) {
  
      item.isComplete = true;

      try {
        await updateItem(item);
        getItems();
      } catch (error) {
        setShow(true);
        console.error(error);
      }

  }

    return (
        <>
        <ErrorDialog handleClose={() => setShow(false)} show={show}></ErrorDialog>
          <h1>
          Showing {items.length} Item(s){' '}
            <Button variant="primary" className="pull-right" onClick={() => getItems()}>
              Refresh
            </Button>
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                      Mark as completed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )

}

export default TodoItemList

