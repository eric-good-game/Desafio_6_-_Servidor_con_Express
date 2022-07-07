import fs from 'fs/promises'

class Container{

  file = {
    nextId:1,
    data:[]
  };

  constructor(fileName,ext='txt'){
    this.filePath = `./${fileName}.${ext}`;
  }

  async getFile(){
    try {
      const json = await fs.readFile(this.filePath,'utf-8');
      if(!json){
        console.log('file empty.');
        return
      }
      const data = JSON.parse(json);
      if (!data?.nextId){
        console.log('file empty.');
        return
      }
      this.file = data;
      console.log('Get data successfully');
      
    } catch (error) {
      console.log(error);
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      console.log('File as been create');
    }
  }

  async getAll(){
    await this.getFile();
    return this.file.data;
  }

  getById(id){
    const item = this.file.data.find(i=>i.id==id);
    if(!item){
      console.log(`The item with id ${id} don't exists.`);
      return null;
    }
    return item
  }

  async save(newItem){
    try {
      if(typeof(newItem) != 'object' || !Object.keys(newItem).length){
        throw new Error('The new item is not object or is empty.')
      }
      await this.getFile();
      this.file.data.push({
        ...newItem,
        id:this.file.nextId,
      })
      this.file.nextId++;
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      console.log('New item save successfully.');
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(remove_id){
    try {
      await this.getFile();
      const length = this.file.data.length;
      this.file.data = this.file.data.filter(i=>i.id!=remove_id);      
      if(length==this.file.data.length){
        throw new Error(`The item with id ${remove_id} don't exists.`)
      }
      console.log(`The item with id ${remove_id} as been deleted.`);
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll(){
    this.file.data = [];
    await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
  }

}

export default Container;