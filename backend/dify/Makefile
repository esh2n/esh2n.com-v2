deploy-env:
	gcloud secrets versions add dify-env --data-file=./docker/.env

deploy-nginx-conf:
	gcloud secrets versions add nginx_config --data-file='./docker/nginx/conf.d/default.conf'

deploy-nginx-image:
	gcloud builds submit --tag gcr.io/esh2n-playground/nginx-cloudrun

deploy-dify:
	gcloud run services replace dify-cloud-run.yaml --region=asia-northeast1