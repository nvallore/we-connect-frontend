import axios from "axios";

export function getDashboardDetails(userRole) {
    console.log(userRole);
    let postType = 'dashboardexternalpost';
    if(userRole !== 'alumni') {
        postType = 'dashboardinternalpost';
    }
    const mockResponse = [
        {
            title: 'Python Workshop',
            postDate: new Date(),
            description: 'Python workshop from we-connect for students of first year. and the minions are awesome!!',
            venue: 'Online',
            subTitle: 'For 1st year student',
            image: 'https://m.media-amazon.com/images/M/MV5BMjEwNjE5MTg1N15BMl5BanBnXkFtZTgwODM1NDgwNjE@._V1_.jpg'
        },
        {
            title: 'Google Cloud Workshop',
            postDate: new Date(),
            description: 'Google cloud workshop from we-connect for students of first year. and the minions are awesome!!',
            venue: 'Online',
            subTitle: 'For 1st year student',
            image: 'https://m.media-amazon.com/images/M/MV5BMjEwNjE5MTg1N15BMl5BanBnXkFtZTgwODM1NDgwNjE@._V1_.jpg'
        },
        {
            title: 'Interview Preparation for Freshers',
            postDate: new Date(),
            description: 'Tips and Tricks to face your first interview!! Join us in person to go through the head of a recuiter.',
            venue: 'Auditorium',
            subTitle: `Don't miss`,
            image: 'https://m.media-amazon.com/images/M/MV5BMjEwNjE5MTg1N15BMl5BanBnXkFtZTgwODM1NDgwNjE@._V1_.jpg'
        }
    ];
    return axios.get(`http://127.0.0.1:8002/api/${postType}`).then(response => {
                const data = response?.data;
                return data;
            });
}
