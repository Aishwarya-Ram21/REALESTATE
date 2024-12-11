// import './list.scss'
// import Card from"../../components/card/Card"

// function List({posts}){
//   return (
//     <div className='list'>
//       {posts.map(item=>(
//         <Card key={item.id} item={item}/>
//       ))}
//     </div>
//   )
// }

// export default List


import './list.scss';
import Card from"../../components/card/Card";

function List({ posts, editable }) {
  return (
    <div className='list'>
      {posts.map((item) => (
        <Card key={item.id} item={item} editable={editable} />
      ))}
    </div>
  );
}

export default List;
