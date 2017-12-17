var obj ={
		"contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Room1",
            "attributes": [
                {
                    "name": "temperature",
                    "type": "float",
                    "value": "23"
                },
                {
                    "name": "pressure",
                    "type": "integer",
                    "value": "720"
                }
            ]
        }
    ],
    "updateAction": "APPEND"
	};
	
	
console.log(obj.contextElements);

console.log(obj.contextElements[0]);
console.log(obj.contextElements[0].id);


console.log(JSON.stringify(obj));
