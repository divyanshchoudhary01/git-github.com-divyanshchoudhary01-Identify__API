const contactController=require('express').Router()
const Contact=require('../models/Contact')
contactController.get("/",async(req,res)=>{
    try
    {

        return res.status(200).send("Welcome to the webservice identify endpoint");
    }catch(error)
    {

    }
})
contactController.post('/',async(req,res)=>{
try{
    if(req.body.email.length==0 && req.body.phoneNumber.length==0)
    {
        return res.status(500).send({msg:"Email and Phone Number both are empty "})

    }
    const isEmailExists=await Contact.findOne({email:req.body.email});
    const isPhoneNumberExits=await Contact.findOne({phoneNumber:req.body.phoneNumber});

    if((!(isEmailExists)) && (!(isPhoneNumberExits)))
    {
        const estimate = await Contact.estimatedDocumentCount();
        const obj={ ...req.body,linkPrecedence:"primary",id:estimate+1};
    const   newUser=await Contact.create(obj)    
    const obj1={ 
        "primaryContatctId":Number,



        "emails": [], // first element being email of primary contact 
    "phoneNumbers": [], // first element being phoneNumber of primary contact
    "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
}
            obj1["emails"].push(req.body.email);
            obj1["phoneNumbers"].push(req.body.phoneNumber)
            obj1["primaryContatctId"]=estimate+1
const c={"contact":{...obj1}}
       return res.status(200).json(c)
    }
else if(isPhoneNumberExits==null && isEmailExists==null && req.body.email.length>0 && req.body.phoneNumber==0)
{
    const estimate = await Contact.estimatedDocumentCount();
    const obj={ ...req.body,linkPrecedence:"primary",id:estimate+1};
const   newUser=await Contact.create(obj)    
const obj1={ 
    "primaryContatctId":Number,



    "emails": [], // first element being email of primary contact 
"phoneNumbers": [], // first element being phoneNumber of primary contact
"secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
}
        obj1["emails"].push(req.body.email);
        obj1["primaryContatctId"]=estimate+1
const c={"contact":{...obj1}}
   return res.status(200).json(c)




    //create a contact with this email 
}
else if(isPhoneNumberExits==null && isEmailExists==null && req.body.phoneNumber.length>0 && req.body.email==0)
{
    //create a contact with this phone Number
    const estimate = await Contact.estimatedDocumentCount();
    const id=estimate+1;
    const obj={ ...req.body,linkPrecedence:"primary",id:estimate+1};
    const   newUser=await Contact.create(obj)    
    const obj1={ 
        "primaryContatctId":Number,



        "emails": [], // first element being email of primary contact 
    "phoneNumbers": [], // first element being phoneNumber of primary contact
    "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
}
            obj1["phoneNumbers"].push(req.body.phoneNumber)
            obj1["primaryContatctId"]=estimate+1
const c={"contact":{...obj1}}
       return res.status(200).json(c)





}

else if(isPhoneNumberExits && isEmailExists==null && req.body.email.length>0)
{
    const estimate = await Contact.estimatedDocumentCount();
    const id=estimate+1;
    var ck=0
    if(isPhoneNumberExits.linkPrecedence=="secondary") ck=isPhoneNumberExits.linkedId
    else ck=isPhoneNumberExits.id
    const obj1={ ...req.body,linkedId:ck,linkPrecedence:"secondary",id:estimate+1};
    
    const   newUser=await Contact.create(obj1)    
    const contacts=await Contact.find({})
    var i=0;
    const obj={ 
        "primaryContatctId":Number,
    "emails": [], // first element being email of primary contact 
    "phoneNumbers": [], // first element being phoneNumber of primary contact
    "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
}


if(isPhoneNumberExits.linkPrecedence.localeCompare("primary")==0)
{
    obj["primaryContatctId"]=isPhoneNumberExits.id
    obj["emails"].push(isPhoneNumberExits.email)
    obj["phoneNumbers"].push(isPhoneNumberExits.phoneNumber)
const lk=isPhoneNumberExits.id;
i=0
while(i<contacts.length)
{
    if(contacts[i].linkedId==lk)
    {
if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
        obj["secondaryContactIds"].push(contacts[i].id);
    }
    i++;

}
const c1={"contact":{...obj}}

return res.status(200).send(c1);

}
else
{
    var lk=isPhoneNumberExits.linkedId
    const data=await Contact.findOne({id:lk})
    obj["primaryContatctId"]=data.id
    obj["emails"].push(data.email)
    obj["phoneNumbers"].push(data.phoneNumber)
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);


}


}
    else if(isPhoneNumberExits!=null && isEmailExists==null && req.body.email.length==0 && req.body.phoneNumber.length>0)
    {
            //if phoneNumber exists then send the data which the contains the phoneNumber
            const contacts=await Contact.find({})
            var i=0;
            const obj={ 
                "primaryContatctId":Number,
            "emails": [], // first element being email of primary contact 
            "phoneNumbers": [], // first element being phoneNumber of primary contact
            "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
        }
        if(isPhoneNumberExits.linkPrecedence.localeCompare("primary")==0)
        {
            obj["primaryContatctId"]=isPhoneNumberExits.id
            obj["emails"].push(isPhoneNumberExits.email)
            obj["phoneNumbers"].push(isPhoneNumberExits.phoneNumber)
        const lk=isPhoneNumberExits.id;
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);
    
        }
        else
        {
            var lk=isPhoneNumberExits.linkedId
            const data=await Contact.findOne({id:lk})
            obj["primaryContatctId"]=data.id
            obj["emails"].push(data.email)
            obj["phoneNumbers"].push(data.phoneNumber)
            i=0
            while(i<contacts.length)
            {
                if(contacts[i].linkedId==lk)
                {
           if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
           if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                    obj["secondaryContactIds"].push(contacts[i].id);
                }
                i++;
        
            }
            const c1={"contact":{...obj}}
            
            return res.status(200).send(c1);
    
    
        }
    



    }
    else if(isPhoneNumberExits==null && isEmailExists && req.body.phoneNumber.length==0)
    {

    const contacts=await Contact.find({})
        var i=0;
        const obj={ 
            "primaryContatctId":Number,
        "emails": [], // first element being email of primary contact 
        "phoneNumbers": [], // first element being phoneNumber of primary contact
        "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
    }
    //check whether the data is primary or not
    //if primary then take out its id and traverse over all the data with that specified id
    if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
    {
        obj["primaryContatctId"]=isEmailExists.id
        obj["emails"].push(req.body.email)
        obj["phoneNumbers"].push(isEmailExists.phoneNumber)
    const lk=isEmailExists.id;
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);

    }
    else
    {
        var lk=isEmailExists.linkedId
        const data=await Contact.findOne({id:lk})
        obj["primaryContatctId"]=data.id
        obj["emails"].push(data.email)
        obj["phoneNumbers"].push(data.phoneNumber)
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);


    }
    }
    else if(isPhoneNumberExits==null && isEmailExists && req.body.phoneNumber.length>0)
{
//insert the new data with this phoneNumber 
const id=isEmailExists.id;
//phoneNumber doesn't exist
//email exists already ,now new data will be created ,
//with upcoming data will linkedPreference will be set as secondary
//linkedId will also be set
const estimate = await Contact.estimatedDocumentCount();
var ck=0
if(isEmailExists.linkPrecedence=="secondary") ck=isEmailExists.linkedId
else ck=isEmailExists.id
const obj1={ ...req.body,linkedId:ck,linkPrecedence:"secondary",id:estimate+1};
const   newUser=await Contact.create(obj1)    

const contacts=await Contact.find({})
var i=0;
const obj={ 
    "primaryContatctId":Number,
"emails": [], // first element being email of primary contact 
"phoneNumbers": [], // first element being phoneNumber of primary contact
"secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
}

if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
{
    obj["primaryContatctId"]=isEmailExists.id
    obj["emails"].push(req.body.email)
    obj["phoneNumbers"].push(isEmailExists.phoneNumber)
const lk=isEmailExists.id;
i=0
while(i<contacts.length)
{
    if(contacts[i].linkedId==lk)
    {
if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
        obj["secondaryContactIds"].push(contacts[i].id);
    }
    i++;

}
const c1={"contact":{...obj}}

return res.status(200).send(c1);

}
else
{
    var lk=isEmailExists.linkedId
    const data=await Contact.findOne({id:lk})
    obj["primaryContatctId"]=data.id
    obj["emails"].push(data.email)
    obj["phoneNumbers"].push(data.phoneNumber)
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);


}


}

    else
    {

      


        if(isEmailExists.linkPrecedence=='primary' && isPhoneNumberExits.linkPrecedence=='primary' && isEmailExists.id!=isPhoneNumberExits.id)
        {
            if(isEmailExists.createdAt<isPhoneNumberExits.createdAt)
            {
                isPhoneNumberExits.linkedId=isEmailExists.id;
                isPhoneNumberExits.linkPrecedence="secondary";
                const updatePost=await Contact.findByIdAndUpdate(
                    isPhoneNumberExits._id,{$set:isPhoneNumberExits},{new:true} )                   

                //here we will consider isEmail as primary and traverse over the data send it
                const contacts=await Contact.find({})
                var i=0;
                while(i<contacts.length)
                {
                    if(contacts[i].linkedId==isPhoneNumberExits.id)
                    {
                        contacts[i].linkedId=isEmailExists.id
                        const updatePost=await Contact.findByIdAndUpdate(
                            contacts[i]._id,{$set:contacts[i]},{new:true} )                           

                    }
                    i++;
            
                }
    
                

                
                const obj={ 
                    "primaryContatctId":Number,
                "emails": [], // first element being email of primary contact 
                "phoneNumbers": [], // first element being phoneNumber of primary contact
                "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
            }
            //check whether the data is primary or not
            //if primary then take out its id and traverse over all the data with that specified id
            if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
            {
                obj["primaryContatctId"]=isEmailExists.id
                obj["emails"].push(req.body.email)
                obj["phoneNumbers"].push(isEmailExists.phoneNumber)
            const lk=isEmailExists.id;
            i=0
            while(i<contacts.length)
            {
                if(contacts[i].linkedId==lk)
                {
           if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
           if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                    obj["secondaryContactIds"].push(contacts[i].id);
                }
                i++;
        
            }
            const c1={"contact":{...obj}}
            
            return res.status(200).send(c1);
        
            }
            else
            {
                var lk=isEmailExists.linkedId
                const data=await Contact.findOne({id:lk})
                obj["primaryContatctId"]=data.id
                obj["emails"].push(data.email)
                obj["phoneNumbers"].push(data.phoneNumber)
                i=0
                while(i<contacts.length)
                {
                    if(contacts[i].linkedId==lk)
                    {
               if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
               if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                        obj["secondaryContactIds"].push(contacts[i].id);
                    }
                    i++;
            
                }
                const c1={"contact":{...obj}}
                
                return res.status(200).send(c1);
        
        
            }
    
    


            }
            else
            {
                isEmailExists.linkedId=isPhoneNumberExits.id;
                isEmailExists.linkPrecedence="secondary";
                

                
                
                
                const updatePost=await Contact.findByIdAndUpdate(
                    isEmailExists._id,{$set:isEmailExists},{new:true} )                   
                const contacts=await Contact.find({})
                var i=0;
                while(i<contacts.length)
                {
                    if(contacts[i].linkedId==isEmailExists.id)
                    {
                        contacts[i].linkedId=isPhoneNumberExits.id
                        const updatePost=await Contact.findByIdAndUpdate(
                            contacts[i]._id,{$set:contacts[i]},{new:true} )                           

                    }
                    i++;
            
                }
    
                const obj={ 
                    "primaryContatctId":Number,
                "emails": [], // first element being email of primary contact 
                "phoneNumbers": [], // first element being phoneNumber of primary contact
                "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
            }
            //check whether the data is primary or not
            //if primary then take out its id and traverse over all the data with that specified id
        
            if(isPhoneNumberExits.linkPrecedence.localeCompare("primary")==0)
            {
                obj["primaryContatctId"]=isPhoneNumberExits.id
                obj["emails"].push(isPhoneNumberExits.email)
                obj["phoneNumbers"].push(isPhoneNumberExits.phoneNumber)
            const lk=isPhoneNumberExits.id;
            i=0
            while(i<contacts.length)
            {
                if(contacts[i].linkedId==lk)
                {
           if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
           if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                    obj["secondaryContactIds"].push(contacts[i].id);
                }
                i++;
        
            }
            const c1={"contact":{...obj}}
            
            return res.status(200).send(c1);
        
            }
            else
            {
                var lk=isPhoneNumberExits.linkedId
                const data=await Contact.findOne({id:lk})
                obj["primaryContatctId"]=data.id
                obj["emails"].push(data.email)
                obj["phoneNumbers"].push(data.phoneNumber)
                i=0
                while(i<contacts.length)
                {
                    if(contacts[i].linkedId==lk)
                    {
               if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
               if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                        obj["secondaryContactIds"].push(contacts[i].id);
                    }
                    i++;
            
                }
                const c1={"contact":{...obj}}
                
                return res.status(200).send(c1);
        
            }
        
    
    


            
            }

           
            
        }  
        else if(isEmailExists.id==isPhoneNumberExits.id)
        {

            const contacts=await Contact.find({})
            var i=0;
            const obj={ 
                "primaryContatctId":Number,
            "emails": [], // first element being email of primary contact 
            "phoneNumbers": [], // first element being phoneNumber of primary contact
            "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
        }
        //check whether the data is primary or not
        //if primary then take out its id and traverse over all the data with that specified id
        if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
        {
            obj["primaryContatctId"]=isEmailExists.id
            obj["emails"].push(req.body.email)
            obj["phoneNumbers"].push(isEmailExists.phoneNumber)
        const lk=isEmailExists.id;
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);
    
        }
        else
        {
            var lk=isEmailExists.linkedId
            const data=await Contact.findOne({id:lk})
            obj["primaryContatctId"]=data.id
            obj["emails"].push(data.email)
            obj["phoneNumbers"].push(data.phoneNumber)
            i=0
            while(i<contacts.length)
            {
                if(contacts[i].linkedId==lk)
                {
           if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
           if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                    obj["secondaryContactIds"].push(contacts[i].id);
                }
                i++;
        
            }
            const c1={"contact":{...obj}}
            
            return res.status(200).send(c1);
    
    
        }

        }
       else if(isEmailExists.linkPrecedence=='secondary' && isPhoneNumberExits.linkPrecedence=='secondary' && isEmailExists.id!=isPhoneNumberExits && isEmailExists.linkedId==isPhoneNumberExits.linkedId)
       {
        const contacts=await Contact.find({})
        var i=0;
        const obj={ 
            "primaryContatctId":Number,
        "emails": [], // first element being email of primary contact 
        "phoneNumbers": [], // first element being phoneNumber of primary contact
        "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
    }
    //check whether the data is primary or not
    //if primary then take out its id and traverse over all the data with that specified id
    if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
    {
        obj["primaryContatctId"]=isEmailExists.id
        obj["emails"].push(req.body.email)
        obj["phoneNumbers"].push(isEmailExists.phoneNumber)
    const lk=isEmailExists.id;
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);

    }
    else
    {
        var lk=isEmailExists.linkedId
        const data=await Contact.findOne({id:lk})
        obj["primaryContatctId"]=data.id
        obj["emails"].push(data.email)
        obj["phoneNumbers"].push(data.phoneNumber)
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);


    }




       }
       else if(isEmailExists.linkPrecedence=='primary' && isPhoneNumberExits.linkPrecedence=='secondary' && isEmailExists.id==isPhoneNumberExits.linkedId)
       {
        const contacts=await Contact.find({})
        var i=0;
        const obj={ 
            "primaryContatctId":Number,
        "emails": [], // first element being email of primary contact 
        "phoneNumbers": [], // first element being phoneNumber of primary contact
        "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
    }
    //check whether the data is primary or not
    //if primary then take out its id and traverse over all the data with that specified id
    if(isEmailExists.linkPrecedence.localeCompare("primary")==0)
    {
        obj["primaryContatctId"]=isEmailExists.id
        obj["emails"].push(req.body.email)
        obj["phoneNumbers"].push(isEmailExists.phoneNumber)
    const lk=isEmailExists.id;
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);

    }
    else
    {
        var lk=isEmailExists.linkedId
        const data=await Contact.findOne({id:lk})
        obj["primaryContatctId"]=data.id
        obj["emails"].push(data.email)
        obj["phoneNumbers"].push(data.phoneNumber)
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);


    }



    
        
       }
       else if(isEmailExists.linkPrecedence=='secondary' && isPhoneNumberExits.linkPrecedence=='primary' && isEmailExists.linkedId==isPhoneNumberExits.id)
       {
        const contacts=await Contact.find({})
        var i=0;
        const obj={ 
            "primaryContatctId":Number,
        "emails": [], // first element being email of primary contact 
        "phoneNumbers": [], // first element being phoneNumber of primary contact
        "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
    }
    if(isPhoneNumberExits.linkPrecedence.localeCompare("primary")==0)
    {
        obj["primaryContatctId"]=isPhoneNumberExits.id
        obj["emails"].push(isPhoneNumberExits.email)
        obj["phoneNumbers"].push(isPhoneNumberExits.phoneNumber)
    const lk=isPhoneNumberExits.id;
    i=0
    while(i<contacts.length)
    {
        if(contacts[i].linkedId==lk)
        {
   if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
   if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
            obj["secondaryContactIds"].push(contacts[i].id);
        }
        i++;

    }
    const c1={"contact":{...obj}}
    
    return res.status(200).send(c1);

    }
    else
    {
        var lk=isPhoneNumberExits.linkedId
        const data=await Contact.findOne({id:lk})
        obj["primaryContatctId"]=data.id
        obj["emails"].push(data.email)
        obj["phoneNumbers"].push(data.phoneNumber)
        i=0
        while(i<contacts.length)
        {
            if(contacts[i].linkedId==lk)
            {
       if(!(obj["emails"].includes(contacts[i].email)))         obj["emails"].push(contacts[i].email);
       if(!(obj["phoneNumbers"].includes(contacts[i].phoneNumber)))         obj["phoneNumbers"].push(contacts[i].phoneNumber)
                obj["secondaryContactIds"].push(contacts[i].id);
            }
            i++;
    
        }
        const c1={"contact":{...obj}}
        
        return res.status(200).send(c1);

    }

        
       }


 
    }
    //const {password,...others}=newUser._doc;
}catch(error)
{
return res.status(500).json(error.message)
}
})

module.exports=contactController