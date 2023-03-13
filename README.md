## Commands

| Commands           |                        Description                         |                Example |
| ------------------ | :--------------------------------------------------------: | ---------------------: |
| create             |                   Creates a new project                    | mee create new-project |
| -m or --model      |         Create a new model in the model directory          |            mee -m post |
| -c or --controller |    Create a new controller file in specified directory     |            mee -c post |
| -s or --service    |      Create a new service file in specified directory      |            mee -s post |
| -r or --route      |       Create a new route file in specified directory       |            mee -r post |
| -R or --resource   |     Create a new resource file in specified directory      |            mee -R post |
| -u or --utility    |  Create a new utility helper file in specified directory   |            mee -u post |
| -M or --middleware | Create a new middleware helper file in specified directory |            mee -M post |

-   automatically adds 'Controller' suffix
-   no need to name controllers as plural e.g posts(instead use post)
-   can specify/create new folder from argument (post/postService)
