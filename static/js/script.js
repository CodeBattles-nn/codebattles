function copy(elem_id) {
    let text = document.getElementById(elem_id).innerHTML;

    navigator.clipboard.writeText(text)
        .then(() => {
           console.log(text);
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
}