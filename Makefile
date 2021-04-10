net:
	docker network create webev_link

up-front:
	# docker-compose -f ../webev-front/docker-compose.yml up
	cd ../webev-front && yarn dev

up-back:
	docker-compose -f docker-compose.yml up
