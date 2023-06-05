import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Popover, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/Add_Contacts/addContacts.actions';

const getData = async () => {
  return await axios.get('https://my-json-server.typicode.com/BHARAT0M/taiyo.ai_server/contacts');
};

const Contacts = () => {
  const [flag, setFlag] = useState(false);
  const [edit, setEdit] = useState({ name: '', lastName: '', status: '' });
  const [view, setView] = useState(false); 
  const dispatch = useDispatch();
  const contacts = useSelector((state: any) => state.addContacts.contacts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (edit.name && edit.lastName && edit.status) {
      dispatch(
        addContact({
          id: v4(),
          ...edit,
        })
      );
    } else {
      alert('Please fill all credentials');
    }
    setEdit({ name: '', lastName: '', status: '' });
    setFlag(false);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleSubmitEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      axios
        .put(`https://my-json-server.typicode.com/BHARAT0M/taiyo.ai_server/contacts/${id}`, {
          name: edit.name,
          lastName: edit.lastName,
          status: edit.status,
        })
        .then(() => alert('Contact Edited Successfully'))
        .then(() => getData().then((res) => console.log(res.data)))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = (id: string) => {
    axios
    .delete(`https://my-json-server.typicode.com/BHARAT0M/taiyo.ai_server/contacts/${id}`)
    .then(() => alert('Contact Deleted Successfully'))
    .then(() => getData().then((res) => console.log(res.data)))
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData().then((res) => console.log(res.data));
  }, [handleSubmit]);

  const onOpen = () => {
    setFlag(true);
  };

  const onClose = () => {
    setFlag(false);
  };

  const viewContact = () => {
    setView(!view);
  };

  return (
    <div id="contact_page">
      <Heading color={'white'} p={'10px 20px'} bg={'#28686e'}>
        Contact Page
      </Heading>
      <div id="contact_page_div" style={{ display: 'flex'}}>
        {window.innerWidth > 900 ? (
          <Box padding={'10px'} w={'19%'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/">
                Contacts
              </Link>
            </Box>
            <br />
            <br />
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/chartsandmaps">
                Charts & Maps
              </Link>
            </Box>
          </Box>
        ) : (
          <Flex justifyContent={'space-evenly'} w={'100%'} margin={'auto'} marginBottom={'20px'} p={'10px 0px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/">
                Contacts
              </Link>
            </Box>
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/chartsandmaps">
                Charts & Maps
              </Link>
            </Box>
          </Flex>
        )}
        <Box padding={'30px'} margin={'auto'} w={'79%'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} border={'1px solid gray'}>
          {flag ? (
            <></>
          ) : (
            <Button marginTop={'20px'} onClick={onOpen}>
              Create Contact
            </Button>
          )}
          <Box>
            {flag ? (
              <form onSubmit={handleSubmit} id="form">
                <Heading onClick={onClose}>X</Heading>
                <label>First Name:</label>
                <input type="text" id="name" name="name" onChange={handleChange} />
                <br />
                <br />
                <label>Last Name:</label>
                <input type="text" id="lastName" name="lastName" onChange={handleChange} />
                <br />
                <br />
                <label>Status:</label>
                <input type="checkbox" id="status" name="status" value="active" onChange={handleChange} />
                <label>Active</label>
                <input type="checkbox" id="status" name="status" value="inactive" onChange={handleChange} />
                <label>Inactive</label>
                <br />
                <br />
                <input type="submit" value="Save Contact" />
              </form>
            ) : (
              <></>
            )}
          </Box>
          {contacts.length < 1 ? (
            <Box id="empty" margin={'auto'} marginTop={'4%'} width={'50%'} border={'1px solid gray'}>
              <Heading>No Contact Found. Please add contacts.</Heading>
            </Box>
          ) : (
            <Box marginTop={'4%'}>
              <div id="data_container">
              {contacts.map((el: { id: string, name: string, lastName: string, status: string }) => ( // Add type annotation for `el`
                  <div key={el.id}>
                    <Text fontWeight={'bold'}>
                      {el.name} {el.lastName}
                    </Text>
                    <Popover>
                      <PopoverTrigger>
                        <button onClick={viewContact} style={{ backgroundColor: '#bbc1c6' }}>
                          View
                        </button>
                      </PopoverTrigger>
                      <PopoverContent backgroundColor={'#bbc1c6'} padding={'20px'} color="white" margin={'auto'}>
                        <PopoverCloseButton backgroundColor={'#bbc1c6'}>
                          <Button backgroundColor={'black'} color={'white'}>
                            x
                          </Button>
                        </PopoverCloseButton>
                        <Text color={'black'}>name- {el.name}</Text>
                        <Text color={'black'}>lastname- {el.lastName}</Text>
                        <Text color={'black'}>status- {el.status}</Text>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger>
                        <button style={{ color: 'white', backgroundColor: '#194d33' }}>Edit</button>
                      </PopoverTrigger>
                      <PopoverContent backgroundColor={'#194d33'} padding={'10px'} color="white" margin={'auto'}>
                        <PopoverCloseButton backgroundColor={'#194d33'}>
                          <Button backgroundColor={'black'} color={'white'}>
                            x
                          </Button>
                        </PopoverCloseButton>
                        <label>Name:</label>
                        <input type="text" id="name" name="name" onChange={handleChangeEdit} />
                        <br />
                        <label>Last Name:</label>
                        <input type="text" id="lastName" name="lastName" onChange={handleChangeEdit} />
                        <br />
                        <label>Status:</label>
                        <input type="checkbox" id="status" name="status" value="active" onChange={handleChangeEdit} />
                        <label>Active</label>
                        <input type="checkbox" id="status" name="status" value="inactive" onChange={handleChangeEdit} />
                        <label>Inactive</label>
                        <br />
                        <button onClick={(e) => handleSubmitEdit(e, el.id)}>Submit</button>
                      </PopoverContent>
                    </Popover>
                    <button onClick={() => deleteContact(el.id)} style={{ color: 'white', backgroundColor: 'red' }}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Contacts;
